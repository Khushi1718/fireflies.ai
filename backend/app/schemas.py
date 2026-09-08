from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, date, timezone
from pydantic import field_serializer

class ParticipantBase(BaseModel):
    name: str
    email: Optional[str] = None

class ParticipantResponse(ParticipantBase):
    id: int
    created_at: Optional[datetime]
    class Config:
        from_attributes = True

class TranscriptSegmentResponse(BaseModel):
    id: int
    speaker_name: str
    speaker_participant_id: Optional[int]
    start_time_seconds: float
    end_time_seconds: float
    sequence: int
    text: str
    is_final: Optional[bool] = True
    class Config:
        from_attributes = True

class SummaryResponse(BaseModel):
    id: int
    overview: str
    key_points_json: str
    class Config:
        from_attributes = True

class TopicResponse(BaseModel):
    id: int
    title: str
    start_time_seconds: Optional[float]
    end_time_seconds: Optional[float]
    sequence: int
    class Config:
        from_attributes = True

class ActionItemBase(BaseModel):
    text: str
    assignee_name: Optional[str] = None
    status: Optional[str] = "open"

class ActionItemCreate(ActionItemBase):
    meeting_id: int

class ActionItemUpdate(BaseModel):
    status: Optional[str] = None
    text: Optional[str] = None
    assignee_name: Optional[str] = None

class ActionItemResponse(ActionItemBase):
    id: int
    source_segment_id: Optional[int]
    class Config:
        from_attributes = True

class MeetingCreate(BaseModel):
    title: str
    media_url: Optional[str] = None
    status: Optional[str] = "processing"

class MeetingResponse(BaseModel):
    id: int
    user_id: int
    title: str
    description: Optional[str] = None
    meeting_date: Optional[datetime]
    duration_seconds: int
    media_url: Optional[str]
    status: str
    recall_bot_id: Optional[str] = None
    created_at: Optional[datetime]
    
    participants: List[ParticipantResponse] = []
    
    @field_serializer("meeting_date", "created_at", when_used="json")
    def serialize_datetime(self, dt: Optional[datetime]) -> Optional[str]:
        if dt is None:
            return None
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt.isoformat()

    class Config:
        from_attributes = True

class MeetingDetailResponse(MeetingResponse):
    transcript_segments: List[TranscriptSegmentResponse] = []
    summary: Optional[SummaryResponse] = None
    topics: List[TopicResponse] = []
    action_items: List[ActionItemResponse] = []
