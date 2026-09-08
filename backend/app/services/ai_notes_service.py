import asyncio
import json
import logging
from sqlalchemy.orm import Session
from app.models import Meeting, TranscriptSegment, Topic, ActionItem, Summary
from app.services import gemini_service
from app.db import SessionLocal
from .transcription_service import broadcast_event

logger = logging.getLogger(__name__)
note_tasks: dict[int, asyncio.Task] = {}


def schedule_live_notes(meeting_id: int):
    task = note_tasks.get(meeting_id)
    if task is None or task.done():
        note_tasks[meeting_id] = asyncio.create_task(process_live_chunk_background(meeting_id))


async def process_live_chunk_background(meeting_id: int):
    notes = await asyncio.to_thread(_process_live_chunk, meeting_id)
    if notes:
        await broadcast_event(meeting_id, "notes_update", notes)


async def finalize_meeting_notes_background(meeting_id: int):
    await process_live_chunk_background(meeting_id)

async def process_live_chunk(meeting_id: int, db: Session):
    """
    Called periodically or when enough new final segments accumulate.
    Fetches the latest unprocessed segments, asks Gemini to extract new notes/actions,
    and updates the database.
    """
    notes = await asyncio.to_thread(_process_live_chunk, meeting_id)
    if notes:
        await broadcast_event(meeting_id, "notes_update", notes)


def _process_live_chunk(meeting_id: int):
    db = SessionLocal()
    try:
        return _process_live_chunk_sync(meeting_id, db)
    finally:
        db.close()


def _process_live_chunk_sync(meeting_id: int, db: Session):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        return
        
    # In a real chunking system, we'd track the last processed segment ID.
    # For simplicity, we just grab all final segments and generate notes incrementally.
    # To keep it efficient, we could grab just the last 20 segments.
    recent_segments = db.query(TranscriptSegment).filter(
        TranscriptSegment.meeting_id == meeting_id,
        TranscriptSegment.is_final == True
    ).order_by(TranscriptSegment.sequence.asc()).all()
    
    if not recent_segments:
        return

    # Build transcript text
    transcript_text = "\n".join([f"{seg.speaker_name} [{seg.start_time_seconds}]: {seg.text}" for seg in recent_segments])
    
    try:
        # Call gemini to generate full notes.
        # Note: For strict chunking, you'd only send the diff and ask it to append.
        # Using generate_notes as a base since it already outputs structured data.
        notes = gemini_service.generate_notes(transcript_text)
        
        # We can update the summary/topics directly here, but during a live meeting
        # we want to broadcast them to the frontend
        
        summary = db.query(Summary).filter(Summary.meeting_id == meeting_id).first()
        if not summary:
            summary = Summary(meeting_id=meeting_id, overview=notes.get("summary", ""))
            db.add(summary)
        else:
            summary.overview = notes.get("summary", "")
        summary.key_points_json = json.dumps(notes.get("key_points", []))
        summary.generated_by = "gemini"

        db.query(Topic).filter(Topic.meeting_id == meeting_id).delete()
        db.query(ActionItem).filter(ActionItem.meeting_id == meeting_id).delete()
        
        for idx, topic_data in enumerate(notes.get("topics", [])):
            topic = Topic(
                meeting_id=meeting_id,
                title=topic_data.get("title"),
                start_time_seconds=topic_data.get("start_time_seconds"),
                end_time_seconds=topic_data.get("end_time_seconds"),
                sequence=idx
            )
            db.add(topic)
            
        for item_data in notes.get("action_items", []):
            action_item = ActionItem(
                meeting_id=meeting_id,
                text=item_data.get("title", "") + ": " + item_data.get("description", ""),
                assignee_name=item_data.get("assignee"),
                status="open"
            )
            db.add(action_item)
            
        db.commit()
        
        return {
            "summary": notes.get("summary"),
            "key_points": notes.get("key_points", []),
            "topics": notes.get("topics"),
            "action_items": notes.get("action_items")
        }
        
    except Exception as e:
        logger.error(f"Failed to process live chunk for meeting {meeting_id}: {e}")
        return None

async def finalize_meeting_notes(meeting_id: int, db: Session):
    """
    Called when the meeting is completed. Runs the full transcript through Gemini.
    """
    notes = await asyncio.to_thread(_process_live_chunk, meeting_id)
    if notes:
        await broadcast_event(meeting_id, "notes_update", notes)
    
