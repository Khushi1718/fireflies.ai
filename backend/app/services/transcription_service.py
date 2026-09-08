import asyncio
import logging
import os
from sqlalchemy.orm import Session
from app.models import Meeting, TranscriptSegment
from app.services import meeting_bot_service

logger = logging.getLogger(__name__)

# In-memory map of meeting_id -> list of asyncio.Queue
# For real-time SSE broadcasting
meeting_streams = {}

async def subscribe_to_meeting(meeting_id: int):
    if meeting_id not in meeting_streams:
        meeting_streams[meeting_id] = []
    q = asyncio.Queue()
    meeting_streams[meeting_id].append(q)
    return q

def unsubscribe_from_meeting(meeting_id: int, q: asyncio.Queue):
    if meeting_id in meeting_streams:
        if q in meeting_streams[meeting_id]:
            meeting_streams[meeting_id].remove(q)
        if len(meeting_streams[meeting_id]) == 0:
            del meeting_streams[meeting_id]

async def broadcast_event(meeting_id: int, event_type: str, payload: dict):
    if meeting_id in meeting_streams:
        for q in meeting_streams[meeting_id]:
            await q.put({"type": event_type, "payload": payload})

from ..db import SessionLocal

def _relative_timestamp(word: dict, key: str) -> float:
    timestamp = word.get(key) or {}
    if isinstance(timestamp, dict):
        return float(timestamp.get("relative") or 0.0)
    return float(timestamp or 0.0)


async def process_webhook(payload: dict):
    db = SessionLocal()
    try:
        event = payload.get("event", "")
        envelope = payload.get("data") or {}
        bot = envelope.get("bot") or {}
        bot_id = bot.get("id") or envelope.get("bot_id")
    
        if not bot_id:
            return
        
        meeting = db.query(Meeting).filter(Meeting.recall_bot_id == bot_id).first()
        if not meeting:
            logger.warning(f"Received webhook for unknown bot_id {bot_id}")
            return

        meeting_id = meeting.id

        if event.startswith("bot."):
            status_event = event.removeprefix("bot.")
            # map recall status to our status
            new_status = meeting.status
            if status_event == "joining_call":
                new_status = "joining"
            elif status_event == "in_call_not_recording":
                new_status = "joining"
            elif status_event == "in_call_recording":
                new_status = "live"
            elif status_event in ("call_ended", "done"):
                new_status = "generating" if status_event == "call_ended" else "completed"
            elif status_event == "fatal":
                new_status = "failed"
            
            if new_status != meeting.status:
                meeting.status = new_status
                db.commit()
                await broadcast_event(meeting_id, "status_update", {"status": new_status})
                if new_status == "completed":
                    from app.services import ai_notes_service
                    asyncio.create_task(ai_notes_service.finalize_meeting_notes_background(meeting_id))
                if status_event == "done":
                    audio_url = await meeting_bot_service.get_bot_audio_url(bot_id)
                    if audio_url:
                        meeting.media_url = audio_url
                        db.commit()
                        await broadcast_event(meeting_id, "media_update", {"media_url": audio_url})
        elif event == "recording.done":
            audio_url = await meeting_bot_service.get_bot_audio_url(bot_id)
            if audio_url:
                meeting.media_url = audio_url
                db.commit()
                await broadcast_event(meeting_id, "media_update", {"media_url": audio_url})
            
        elif event in ("transcript.partial_data", "transcript.data"):
            transcript = envelope.get("data") or {}
            words = transcript.get("words") or []
            participant = transcript.get("participant") or {}
            speaker = participant.get("name") or f"Speaker {participant.get('id', 'Unknown')}"
            text = " ".join(word.get("text", "") for word in words).strip()
            is_final = event == "transcript.data"

            if not text:
                return

            start_time = _relative_timestamp(words[0], "start_timestamp") if words else 0.0
            end_time = _relative_timestamp(words[-1], "end_timestamp") if words else start_time
        
            # We will look for the latest segment for this meeting
            latest = db.query(TranscriptSegment).filter(
                TranscriptSegment.meeting_id == meeting_id
            ).order_by(TranscriptSegment.sequence.desc()).first()
        
            seq = 1
            if latest:
                if latest.speaker_name == speaker and not latest.is_final:
                    # Update the existing partial segment
                    latest.text = text
                    latest.end_time_seconds = end_time
                    latest.is_final = is_final
                    seq = latest.sequence
                else:
                    seq = latest.sequence + 1
                    new_seg = TranscriptSegment(
                        meeting_id=meeting_id,
                        speaker_name=speaker,
                        start_time_seconds=start_time,
                        end_time_seconds=end_time,
                        sequence=seq,
                        text=text,
                        is_final=is_final
                    )
                    db.add(new_seg)
            else:
                new_seg = TranscriptSegment(
                    meeting_id=meeting_id,
                    speaker_name=speaker,
                    start_time_seconds=start_time,
                    end_time_seconds=end_time,
                    sequence=seq,
                    text=text,
                    is_final=is_final
                )
                db.add(new_seg)
            
            db.commit()
            await broadcast_event(meeting_id, "transcript_update", {
                "speaker": speaker,
                "text": text,
                "is_final": is_final,
                "start_time_seconds": start_time,
                "end_time_seconds": end_time
            })

            if is_final:
                from app.services import ai_notes_service
                ai_notes_service.schedule_live_notes(meeting_id)
        elif event.startswith(("transcript.", "recording.")):
            logger.info("Received Recall lifecycle event %s for bot %s", event, bot_id)
        
    finally:
        db.close()

async def sync_bot_data(meeting_id: int, db: Session):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting or not meeting.recall_bot_id:
        return

    bot_id = meeting.recall_bot_id

    # Recall webhooks can be delayed or unavailable while a tunnel restarts.
    # Poll the authoritative transcript endpoint so live pages still receive
    # real transcript segments and AI notes.
    try:
        transcript = await meeting_bot_service.get_bot_transcript(bot_id)
        if transcript:
            _persist_recall_transcript(meeting_id, transcript, db)
    except Exception as exc:
        logger.warning("Transcript polling failed for meeting %s: %s", meeting_id, exc)

    if meeting.status in ("completed", "failed"):
        return
    
    # 1. Sync Status
    try:
        status_data = await meeting_bot_service.get_bot_status(bot_id)
        if status_data:
            status_event = status_data.get("status_changes", [{}])[-1].get("code")
            if not status_event:
                status_event = status_data.get("status", {}).get("code")
            
            new_status = meeting.status
            if status_event == "joining_call":
                new_status = "joining"
            elif status_event == "in_call_recording":
                new_status = "live"
            elif status_event in ("done", "call_ended"):
                new_status = "completed"
            elif status_event == "fatal":
                new_status = "failed"
                
            if new_status != meeting.status:
                meeting.status = new_status
                
                # Update duration if completed
                if new_status == "completed":
                    latest = db.query(TranscriptSegment).filter(TranscriptSegment.meeting_id == meeting_id).order_by(TranscriptSegment.end_time_seconds.desc()).first()
                    if latest and latest.end_time_seconds:
                        meeting.duration_seconds = max(meeting.duration_seconds or 0, int(latest.end_time_seconds))
                
                db.commit()
                await broadcast_event(meeting_id, "status_update", {"status": new_status})
                
                if new_status == "completed":
                    from app.services import ai_notes_service
                    asyncio.create_task(ai_notes_service.finalize_meeting_notes_background(meeting_id))
                    audio_url = await meeting_bot_service.get_bot_audio_url(bot_id)
                    if audio_url:
                        meeting.media_url = audio_url
                        db.commit()
                        await broadcast_event(meeting_id, "media_update", {"media_url": audio_url})
                
    except Exception as e:
        logger.error(f"Error syncing status: {e}")


def _persist_recall_transcript(meeting_id: int, transcript: list, db: Session):
    """Upsert Recall transcript entries and broadcast newly available segments."""
    existing = db.query(TranscriptSegment).filter(
        TranscriptSegment.meeting_id == meeting_id
    ).order_by(TranscriptSegment.sequence.asc()).all()
    existing_by_sequence = {segment.sequence: segment for segment in existing}
    changed = False

    for index, item in enumerate(transcript, start=1):
        participant = item.get("participant") or {}
        speaker = participant.get("name") or f"Speaker {participant.get('id', 'Unknown')}"
        words = item.get("words") or []
        text = item.get("text") or " ".join(word.get("text", "") for word in words).strip()
        if not text:
            continue
        start = _relative_timestamp(words[0], "start_timestamp") if words else float(item.get("start_time", 0) or 0)
        end = _relative_timestamp(words[-1], "end_timestamp") if words else float(item.get("end_time", start) or start)
        segment = existing_by_sequence.get(index)
        if segment is None:
            segment = TranscriptSegment(
                meeting_id=meeting_id,
                speaker_name=speaker,
                start_time_seconds=start,
                end_time_seconds=end,
                sequence=index,
                text=text,
                is_final=True,
            )
            db.add(segment)
            changed = True
        elif segment.text != text or segment.speaker_name != speaker:
            segment.speaker_name = speaker
            segment.text = text
            segment.start_time_seconds = start
            segment.end_time_seconds = end
            segment.is_final = True
            changed = True

    if not changed:
        return

    db.commit()
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if meeting:
        schedule_live_notes(meeting_id)
