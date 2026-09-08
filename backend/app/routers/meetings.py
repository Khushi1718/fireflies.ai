from fastapi import APIRouter, Depends, HTTPException, Request, BackgroundTasks
from fastapi.responses import StreamingResponse, RedirectResponse, Response
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from .. import models, schemas
from ..db import get_db
from ..services import meeting_bot_service, ai_notes_service, transcription_service
import asyncio
import json
import httpx

router = APIRouter(prefix="/meetings", tags=["meetings"])

@router.post("", response_model=schemas.MeetingResponse)
def create_meeting(meeting: schemas.MeetingCreate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == 1).first()
    if not user:
        raise HTTPException(status_code=500, detail="Default user not found")
        
    db_meeting = models.Meeting(
        user_id=user.id,
        title=meeting.title,
        media_url=meeting.media_url,
        status=meeting.status
    )
    db.add(db_meeting)
    db.commit()
    db.refresh(db_meeting)
    return db_meeting

from typing import Optional
from pydantic import Field

@router.get("", response_model=list[schemas.MeetingResponse])
def get_meetings(q: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.Meeting)
    if q and q.strip():
        query = query.filter(models.Meeting.title.ilike(f"%{q.strip().lower()}%"))
    meetings = query.order_by(models.Meeting.created_at.desc()).all()
    for m in meetings:
        if (m.duration_seconds is None or m.duration_seconds == 0) and m.transcript_segments:
            max_sec = max([s.end_time_seconds for s in m.transcript_segments], default=0)
            if max_sec > 0:
                m.duration_seconds = int(max_sec)
    return meetings

@router.get("/{meeting_id}", response_model=schemas.MeetingDetailResponse)
async def get_meeting(meeting_id: int, db: Session = Depends(get_db)):
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    # Poll Recall while a bot is active. Webhooks carry transcript data, but
    # status events are not configured as realtime endpoints, so a meeting
    # can have transcript rows while still appearing stuck in "joining".
    if meeting.recall_bot_id and meeting.status not in ("completed", "failed"):
        await transcription_service.sync_bot_data(meeting_id, db)
        db.refresh(meeting)
    if meeting.status == "completed" and meeting.transcript_segments and not meeting.summary:
        try:
            await ai_notes_service.finalize_meeting_notes(meeting_id, db)
            db.refresh(meeting)
        except Exception as exc:
            print(f"Failed to backfill notes for meeting {meeting_id}: {exc}")
    
    # We need to explicitly order the transcript segments by sequence
    meeting.transcript_segments.sort(key=lambda x: x.sequence)
    meeting.topics.sort(key=lambda x: x.sequence)
    
    if (meeting.duration_seconds is None or meeting.duration_seconds == 0) and meeting.transcript_segments:
        max_sec = max([s.end_time_seconds for s in meeting.transcript_segments], default=0)
        if max_sec > 0:
            meeting.duration_seconds = int(max_sec)

    # Completed meetings created from a meeting link initially store that link
    # in media_url. Resolve Recall's actual recording before returning details.
    if (
        meeting.status == "completed"
        and meeting.recall_bot_id
        and (not meeting.media_url or meeting.media_url.startswith(("http://", "https://")) and "recall.ai" not in meeting.media_url)
    ):
        try:
            audio_url = await meeting_bot_service.wait_for_bot_audio_url(meeting.recall_bot_id)
            if audio_url:
                meeting.media_url = audio_url
                db.commit()
                db.refresh(meeting)
        except Exception as exc:
            # Details and transcript remain usable if Recall's artifact endpoint is unavailable.
            print(f"Failed to backfill audio URL for meeting {meeting_id}: {exc}")
    
    return meeting

@router.delete("/{meeting_id}")
def delete_meeting(meeting_id: int, db: Session = Depends(get_db)):
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    db.delete(meeting)
    db.commit()
    return {"status": "success"}

@router.get("/{meeting_id}/audio")
async def get_meeting_audio(meeting_id: int, req: Request, db: Session = Depends(get_db)):
    """Proxy a fresh Recall recording so browser playback stays same-origin."""
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    if not meeting.recall_bot_id:
        raise HTTPException(status_code=404, detail="No recorded audio is available for this meeting")

    audio_url = await meeting_bot_service.get_bot_audio_url(meeting.recall_bot_id)
    if not audio_url:
        raise HTTPException(status_code=404, detail="Recording is not available yet")

    range_header = req.headers.get("range")
    request_headers = {"Range": range_header} if range_header else {}
    async with httpx.AsyncClient(follow_redirects=True, timeout=60.0) as client:
        upstream = await client.get(audio_url, headers=request_headers)
    if upstream.status_code >= 400:
        raise HTTPException(status_code=502, detail="The recording provider could not return audio")

    response_headers = {
        key: value
        for key, value in {
            "Accept-Ranges": upstream.headers.get("accept-ranges", "bytes"),
            "Content-Range": upstream.headers.get("content-range"),
            "Content-Length": upstream.headers.get("content-length"),
        }.items()
        if value
    }
    return Response(
        content=upstream.content,
        status_code=upstream.status_code,
        media_type="audio/mpeg",
        headers=response_headers,
    )

@router.patch("/{meeting_id}", response_model=schemas.MeetingResponse)
def update_meeting(meeting_id: int, update_data: dict, db: Session = Depends(get_db)):
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    if "title" in update_data:
        meeting.title = update_data["title"]
    db.commit()
    db.refresh(meeting)
    return meeting

@router.post("/{meeting_id}/start", response_model=schemas.MeetingResponse)
async def start_meeting(meeting_id: int, db: Session = Depends(get_db)):
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    if meeting.status not in ["CREATED", "ready"]:
        raise HTTPException(status_code=400, detail=f"Cannot start meeting from status: {meeting.status}")
    
    if meeting.media_url:
        try:
            bot_id = await meeting_bot_service.create_bot(meeting.media_url, meeting.id)
            meeting.recall_bot_id = bot_id
            meeting.status = "joining"
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Recall API Error: {str(e)}")
    else:
        meeting.status = "LIVE"
        
    meeting.start_time = datetime.now(timezone.utc)
    db.commit()
    db.refresh(meeting)
    return meeting

@router.post("/{meeting_id}/pause", response_model=schemas.MeetingResponse)
async def pause_meeting(meeting_id: int, db: Session = Depends(get_db)):
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    if meeting.status != "live":
        raise HTTPException(status_code=400, detail=f"Cannot pause meeting from status: {meeting.status}")
    
    # Recall.ai currently does not natively support "pausing" bots mid-call without stopping them,
    # but we can simulate the status change locally.
    meeting.status = "paused"
    db.commit()
    db.refresh(meeting)
    return meeting

@router.post("/{meeting_id}/resume", response_model=schemas.MeetingResponse)
async def resume_meeting(meeting_id: int, db: Session = Depends(get_db)):
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    if meeting.status != "paused":
        raise HTTPException(status_code=400, detail=f"Cannot resume meeting from status: {meeting.status}")
    
    meeting.status = "live"
    db.commit()
    db.refresh(meeting)
    return meeting

@router.post("/{meeting_id}/stop", response_model=schemas.MeetingResponse)
async def stop_meeting(meeting_id: int, db: Session = Depends(get_db)):
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    if meeting.status not in ["live", "paused", "joining"]:
        raise HTTPException(status_code=400, detail=f"Cannot stop meeting from status: {meeting.status}")
    
    if meeting.recall_bot_id:
        try:
            await meeting_bot_service.stop_bot(meeting.recall_bot_id)
        except Exception as e:
            pass # ignore errors on stop
            
    meeting.status = "completed"
    meeting.end_time = datetime.now(timezone.utc)
    
    if meeting.start_time:
        st = meeting.start_time
        if st.tzinfo is None:
            st = st.replace(tzinfo=timezone.utc)
        duration = (meeting.end_time - st).total_seconds()
        meeting.duration_seconds = int(duration)
        
    latest_seg = db.query(models.TranscriptSegment).filter(models.TranscriptSegment.meeting_id == meeting_id).order_by(models.TranscriptSegment.end_time_seconds.desc()).first()
    if latest_seg and latest_seg.end_time_seconds:
        meeting.duration_seconds = max(meeting.duration_seconds or 0, int(latest_seg.end_time_seconds))
        
    db.commit()
    db.refresh(meeting)
    
    # Trigger finalization in the background or await it
    try:
        await ai_notes_service.finalize_meeting_notes(meeting_id, db)
    except Exception as e:
        print(f"Failed to finalize notes: {e}")
    
    # Try to save the Recall audio URL for playback
    if meeting.recall_bot_id:
        try:
            audio_url = await meeting_bot_service.wait_for_bot_audio_url(meeting.recall_bot_id)
            if audio_url:
                db.refresh(meeting)
                meeting.media_url = audio_url
                db.commit()
        except Exception as e:
            print(f"Failed to fetch audio URL from Recall: {e}")
        
    return meeting


@router.post("/{meeting_id}/generate")
async def generate_meeting_notes(meeting_id: int, db: Session = Depends(get_db)):
    """
    Trigger AI notes generation (or re-generation) for a meeting.
    Uses all final transcript segments to generate summary, key_points, topics, action_items.
    """
    from ..services.gemini_service import generate_notes
    
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    
    # Build full transcript text
    segments = db.query(models.TranscriptSegment).filter(
        models.TranscriptSegment.meeting_id == meeting_id
    ).order_by(models.TranscriptSegment.sequence.asc()).all()
    
    if not segments:
        raise HTTPException(status_code=400, detail="No transcript segments found. Please wait for the transcript to be captured.")
    
    transcript_text = "\n".join(
        [f"{seg.speaker_name} [{int(seg.start_time_seconds)}s]: {seg.text}" for seg in segments]
    )
    
    try:
        notes = await asyncio.to_thread(generate_notes, transcript_text)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Gemini failed to generate notes: {str(e)}")
    
    # Persist summary
    summary = db.query(models.Summary).filter(models.Summary.meeting_id == meeting_id).first()
    if not summary:
        summary = models.Summary(
            meeting_id=meeting_id,
            overview=notes.get("summary", ""),
            key_points_json=json.dumps(notes.get("key_points", [])),
            generated_by="gemini"
        )
        db.add(summary)
    else:
        summary.overview = notes.get("summary", "")
        summary.key_points_json = json.dumps(notes.get("key_points", []))
        summary.generated_by = "gemini"
    
    # Replace topics
    db.query(models.Topic).filter(models.Topic.meeting_id == meeting_id).delete()
    for idx, topic_data in enumerate(notes.get("topics", [])):
        db.add(models.Topic(
            meeting_id=meeting_id,
            title=topic_data.get("title", ""),
            start_time_seconds=topic_data.get("start_time_seconds"),
            end_time_seconds=topic_data.get("end_time_seconds"),
            sequence=idx
        ))
    
    # Replace action items
    db.query(models.ActionItem).filter(models.ActionItem.meeting_id == meeting_id).delete()
    for item_data in notes.get("action_items", []):
        title = item_data.get("title", "")
        description = item_data.get("description", "")
        text = f"{title}: {description}".strip(": ") if description else title
        db.add(models.ActionItem(
            meeting_id=meeting_id,
            text=text,
            assignee_name=item_data.get("assignee"),
            status="open"
        ))
    
    db.commit()
    db.refresh(meeting)
    
    return {
        "status": "ok",
        "summary": notes.get("summary"),
        "key_points": notes.get("key_points"),
        "topics": notes.get("topics"),
        "action_items": notes.get("action_items"),
        "segment_count": len(segments)
    }


@router.get("/{meeting_id}/notes")
def get_meeting_notes(meeting_id: int, db: Session = Depends(get_db)):
    """Return the current notes, topics and action items for a meeting."""
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    
    summary = db.query(models.Summary).filter(models.Summary.meeting_id == meeting_id).first()
    topics = db.query(models.Topic).filter(models.Topic.meeting_id == meeting_id).order_by(models.Topic.sequence).all()
    action_items = db.query(models.ActionItem).filter(models.ActionItem.meeting_id == meeting_id).all()
    
    key_points = []
    if summary and summary.key_points_json:
        try:
            key_points = json.loads(summary.key_points_json)
        except Exception:
            pass
    
    return {
        "summary": summary.overview if summary else None,
        "key_points": key_points,
        "topics": [{"id": t.id, "title": t.title, "start_time_seconds": t.start_time_seconds, "end_time_seconds": t.end_time_seconds} for t in topics],
        "action_items": [{"id": ai.id, "text": ai.text, "assignee_name": ai.assignee_name, "status": ai.status} for ai in action_items],
        "generated_by": summary.generated_by if summary else None
    }

class AskFredRequest(schemas.BaseModel):
    question: str
    history: list[dict[str, str]] = Field(default_factory=list)

@router.post("/{meeting_id}/ask")
async def ask_fred_endpoint(meeting_id: int, request: AskFredRequest, db: Session = Depends(get_db)):
    from ..services.gemini_service import ask_fred
    
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
        
    if not request.question.strip():
        raise HTTPException(status_code=422, detail="Question cannot be empty")

    # Keep the transcript and generated notes together for every answer.
    meeting.transcript_segments.sort(key=lambda x: x.sequence)
    transcript_text = "\n".join([f"{seg.speaker_name}: {seg.text}" for seg in meeting.transcript_segments])

    summary = meeting.summary
    notes_context = {
        "summary": summary.overview if summary else None,
        "key_points": [],
        "topics": [topic.title for topic in sorted(meeting.topics, key=lambda item: item.sequence)],
        "action_items": [
            {"text": item.text, "assignee": item.assignee_name, "status": item.status}
            for item in meeting.action_items
        ],
    }
    if summary and summary.key_points_json:
        try:
            notes_context["key_points"] = json.loads(summary.key_points_json)
        except (TypeError, json.JSONDecodeError):
            notes_context["key_points"] = []

    if not transcript_text.strip() and not summary:
        raise HTTPException(status_code=422, detail="This meeting has no transcript or AI notes yet")

    history = [
        {"role": item["role"], "content": item["content"]}
        for item in request.history[-10:]
        if item.get("role") in {"user", "assistant"} and item.get("content", "").strip()
    ]
        
    try:
        answer = await asyncio.to_thread(
            ask_fred, transcript_text, request.question, notes_context, history
        )
        return {"answer": answer}
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"AskFred failed: {exc}") from exc

from ..db import SessionLocal

@router.get("/{meeting_id}/stream")
async def stream_meeting_events(meeting_id: int, req: Request):
    q = await transcription_service.subscribe_to_meeting(meeting_id)
    
    async def poll_worker():
        while True:
            db = SessionLocal()
            try:
                m = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
                if not m or m.status in ("completed", "failed"):
                    break
                await transcription_service.sync_bot_data(meeting_id, db)
            except Exception as e:
                print(f"Polling error: {e}")
            finally:
                db.close()
            await asyncio.sleep(5)
            
    poll_task = asyncio.create_task(poll_worker())
    
    async def event_generator():
        try:
            # Immediate keepalive to confirm connection
            yield ": connected\n\n"
            while True:
                if await req.is_disconnected():
                    break
                    
                try:
                    event = await asyncio.wait_for(q.get(), timeout=2.0)
                    yield f"data: {json.dumps(event)}\n\n"
                except asyncio.TimeoutError:
                    # Keep-alive heartbeat so proxies and browser don't stall
                    yield ": ping\n\n"
        except asyncio.CancelledError:
            pass
        finally:
            poll_task.cancel()
            transcription_service.unsubscribe_from_meeting(meeting_id, q)
            
    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        }
    )

