from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from datetime import datetime, timezone
import json
import os
import shutil

from .. import models, schemas
from ..db import get_db
from ..services.gemini_service import generate_transcript, generate_notes

router = APIRouter(prefix="/meetings", tags=["transcripts"])

# Create uploads directory if it doesn't exist
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "../../uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/{meeting_id}/audio")
async def upload_audio(meeting_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
        
    file_location = os.path.join(UPLOAD_DIR, f"{meeting_id}_{file.filename}")
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
        
    meeting.media_url = f"/uploads/{meeting_id}_{file.filename}"
    db.commit()
    return {"status": "success", "media_url": meeting.media_url}

@router.post("/{meeting_id}/transcript/generate", response_model=schemas.MeetingDetailResponse)
def generate_meeting_transcript(meeting_id: int, db: Session = Depends(get_db)):
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    
    # 1. Resolve Audio Path
    audio_path = None
    if meeting.media_url and meeting.media_url.startswith("/uploads/"):
        filename = meeting.media_url.split("/")[-1]
        audio_path = os.path.join(UPLOAD_DIR, filename)
    else:
        # Fallback to a demo audio file if no file was uploaded
        demo_path = os.path.join(UPLOAD_DIR, "demo_meeting.mp3")
        if os.path.exists(demo_path):
            audio_path = demo_path
            # Provide an endpoint route for the frontend to play the audio
            meeting.media_url = "http://localhost:8000/uploads/demo_meeting.mp3"
        else:
            raise HTTPException(status_code=400, detail="No audio file uploaded and demo_meeting.mp3 not found.")

    try:
        # 2. Call Gemini for Transcript
        transcript_data = generate_transcript(audio_path)
        
        # Clear existing transcript segments just in case
        db.query(models.TranscriptSegment).filter(models.TranscriptSegment.meeting_id == meeting_id).delete()
        
        segments = []
        for idx, seg in enumerate(transcript_data.get("segments", [])):
            db_seg = models.TranscriptSegment(
                meeting_id=meeting.id,
                speaker_name=seg["speaker"],
                start_time_seconds=seg["start_time"],
                end_time_seconds=seg["end_time"],
                sequence=idx,
                text=seg["text"]
            )
            segments.append(db_seg)
        db.bulk_save_objects(segments)
        db.commit()
        
        # Build full transcript text for notes generation
        full_text = "\n".join([f"[{s.start_time_seconds}s - {s.end_time_seconds}s] {s.speaker_name}: {s.text}" for s in segments])

        # 3. Call Gemini for Notes
        notes_data = generate_notes(full_text)
        
        # Save Summary
        if meeting.summary:
            db.delete(meeting.summary)
            db.commit()
            
        summary = models.Summary(
            meeting_id=meeting.id,
            overview=notes_data.get("summary", ""),
            key_points_json=json.dumps(notes_data.get("key_points", [])),
            generated_by="gemini"
        )
        db.add(summary)
        
        # Save Topics
        db.query(models.Topic).filter(models.Topic.meeting_id == meeting_id).delete()
        topics = []
        for idx, topic in enumerate(notes_data.get("topics", [])):
            db_topic = models.Topic(
                meeting_id=meeting.id,
                title=topic["title"],
                start_time_seconds=topic.get("start_time_seconds"),
                end_time_seconds=topic.get("end_time_seconds"),
                sequence=idx
            )
            topics.append(db_topic)
        db.bulk_save_objects(topics)
        
        # Save Action Items
        db.query(models.ActionItem).filter(models.ActionItem.meeting_id == meeting_id).delete()
        action_items = []
        for ai in notes_data.get("action_items", []):
            db_ai = models.ActionItem(
                meeting_id=meeting.id,
                text=ai["description"],
                assignee_name=ai.get("assignee"),
                # We could try to parse due_date if we wanted to
                status="open"
            )
            action_items.append(db_ai)
        db.bulk_save_objects(action_items)
        
        # Ensure meeting status is COMPLETED
        meeting.status = "COMPLETED"
        if not meeting.end_time:
            meeting.end_time = datetime.now(timezone.utc)
            
        db.commit()
        db.refresh(meeting)
        
        # Refresh relationships
        meeting.transcript_segments.sort(key=lambda x: x.sequence)
        meeting.topics.sort(key=lambda x: x.sequence)
        
        return meeting

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{meeting_id}/transcript/search", response_model=list[schemas.TranscriptSegmentResponse])
def search_transcript(meeting_id: int, q: str, db: Session = Depends(get_db)):
    """
    Search transcript segments for a specific meeting.
    """
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
        
    if not q or not q.strip():
        return meeting.transcript_segments
        
    search_query = f"%{q.strip().lower()}%"
    segments = db.query(models.TranscriptSegment).filter(
        models.TranscriptSegment.meeting_id == meeting_id,
        models.TranscriptSegment.text.ilike(search_query)
    ).order_by(models.TranscriptSegment.sequence).all()
    
    return segments
