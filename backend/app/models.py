from sqlalchemy import Column, Integer, String, Float, DateTime, Date, ForeignKey, Table, Text, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .db import Base

meeting_participants = Table(
    'meeting_participants',
    Base.metadata,
    Column('id', Integer, primary_key=True, index=True),
    Column('meeting_id', Integer, ForeignKey('meetings.id', ondelete='CASCADE'), nullable=False),
    Column('participant_id', Integer, ForeignKey('participants.id', ondelete='RESTRICT'), nullable=False)
)

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    meetings = relationship("Meeting", back_populates="owner")

class Participant(Base):
    __tablename__ = "participants"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    meetings = relationship("Meeting", secondary=meeting_participants, back_populates="participants")

class Meeting(Base):
    __tablename__ = "meetings"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="RESTRICT"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    meeting_date = Column(DateTime(timezone=True), server_default=func.now())
    start_time = Column(DateTime(timezone=True), nullable=True)
    end_time = Column(DateTime(timezone=True), nullable=True)
    duration_seconds = Column(Integer, default=0)
    media_url = Column(String, nullable=True)
    status = Column(String, default="ready")
    recall_bot_id = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    owner = relationship("User", back_populates="meetings")
    participants = relationship("Participant", secondary=meeting_participants, back_populates="meetings")
    transcript_segments = relationship("TranscriptSegment", back_populates="meeting", cascade="all, delete-orphan")
    summary = relationship("Summary", back_populates="meeting", uselist=False, cascade="all, delete-orphan")
    topics = relationship("Topic", back_populates="meeting", cascade="all, delete-orphan")
    action_items = relationship("ActionItem", back_populates="meeting", cascade="all, delete-orphan")

class TranscriptSegment(Base):
    __tablename__ = "transcript_segments"
    
    id = Column(Integer, primary_key=True, index=True)
    meeting_id = Column(Integer, ForeignKey("meetings.id", ondelete="CASCADE"), nullable=False)
    speaker_participant_id = Column(Integer, ForeignKey("participants.id", ondelete="SET NULL"), nullable=True)
    speaker_name = Column(String, nullable=False)
    start_time_seconds = Column(Float, nullable=False)
    end_time_seconds = Column(Float, nullable=False)
    sequence = Column(Integer, nullable=False)
    text = Column(Text, nullable=False)
    is_final = Column(Boolean, default=True)
    
    meeting = relationship("Meeting", back_populates="transcript_segments")

class Summary(Base):
    __tablename__ = "summaries"
    
    id = Column(Integer, primary_key=True, index=True)
    meeting_id = Column(Integer, ForeignKey("meetings.id", ondelete="CASCADE"), unique=True, nullable=False)
    overview = Column(Text, nullable=False)
    key_points_json = Column(Text, default="[]")
    generated_by = Column(String, default="mock")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    meeting = relationship("Meeting", back_populates="summary")

class Topic(Base):
    __tablename__ = "topics"
    
    id = Column(Integer, primary_key=True, index=True)
    meeting_id = Column(Integer, ForeignKey("meetings.id", ondelete="CASCADE"), nullable=False)
    title = Column(String, nullable=False)
    start_time_seconds = Column(Float, nullable=True)
    end_time_seconds = Column(Float, nullable=True)
    sequence = Column(Integer, nullable=False)
    
    meeting = relationship("Meeting", back_populates="topics")

class ActionItem(Base):
    __tablename__ = "action_items"
    
    id = Column(Integer, primary_key=True, index=True)
    meeting_id = Column(Integer, ForeignKey("meetings.id", ondelete="CASCADE"), nullable=False)
    assignee_name = Column(String, nullable=True)
    assignee_participant_id = Column(Integer, ForeignKey("participants.id", ondelete="SET NULL"), nullable=True)
    source_segment_id = Column(Integer, ForeignKey("transcript_segments.id", ondelete="SET NULL"), nullable=True)
    text = Column(Text, nullable=False)
    due_date = Column(Date, nullable=True)
    status = Column(String, default="open")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    meeting = relationship("Meeting", back_populates="action_items")
