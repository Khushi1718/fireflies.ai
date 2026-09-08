import json
from .db import SessionLocal, engine, Base
from .models import User, Meeting, Participant, TranscriptSegment, Summary, Topic, ActionItem

# Ensure tables exist
Base.metadata.create_all(bind=engine)

def seed_db():
    db = SessionLocal()
    try:
        # 1. Create Default User
        user = db.query(User).filter(User.id == 1).first()
        if not user:
            user = User(name="Khushi Nain", email="khushi@example.com")
            db.add(user)
            db.commit()
            db.refresh(user)

        # 2. Check if we already have meetings
        if db.query(Meeting).count() > 0:
            print("Database already seeded.")
            return

        # 3. Create Participants
        p1 = Participant(name="Khushi Nain", email="khushi@example.com")
        p2 = Participant(name="Rahul Kumar")
        p3 = Participant(name="Aman Sharma")
        db.add_all([p1, p2, p3])
        db.commit()

        # 4. Create Meeting
        meeting = Meeting(
            user_id=user.id,
            title="Product team sync",
            duration_seconds=120,
            media_url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            status="ready"
        )
        meeting.participants.extend([p1, p2, p3])
        db.add(meeting)
        db.commit()
        db.refresh(meeting)

        # 5. Create Transcript Segments
        segments = [
            TranscriptSegment(meeting_id=meeting.id, speaker_name="Khushi", speaker_participant_id=p1.id, start_time_seconds=0, end_time_seconds=5.5, sequence=0, text="Let's begin today's discussion."),
            TranscriptSegment(meeting_id=meeting.id, speaker_name="Rahul", speaker_participant_id=p2.id, start_time_seconds=6, end_time_seconds=12, sequence=1, text="The backend API is almost complete. We just need to wire it up."),
            TranscriptSegment(meeting_id=meeting.id, speaker_name="Khushi", speaker_participant_id=p1.id, start_time_seconds=14, end_time_seconds=18, sequence=2, text="Great. Let's review the remaining tasks before we deploy."),
            TranscriptSegment(meeting_id=meeting.id, speaker_name="Aman", speaker_participant_id=p3.id, start_time_seconds=20, end_time_seconds=25, sequence=3, text="I have the deployment configuration ready on my end."),
            TranscriptSegment(meeting_id=meeting.id, speaker_name="Rahul", speaker_participant_id=p2.id, start_time_seconds=26, end_time_seconds=32, sequence=4, text="We should deploy tomorrow morning. I'll monitor the logs."),
            TranscriptSegment(meeting_id=meeting.id, speaker_name="Khushi", speaker_participant_id=p1.id, start_time_seconds=34, end_time_seconds=40, sequence=5, text="Sounds like a plan. Khushi will finish the frontend UI today."),
            TranscriptSegment(meeting_id=meeting.id, speaker_name="Aman", speaker_participant_id=p3.id, start_time_seconds=42, end_time_seconds=48, sequence=6, text="I'll schedule a final review meeting later this afternoon.")
        ]
        db.add_all(segments)

        # 6. Create Topics
        topics = [
            Topic(meeting_id=meeting.id, title="Frontend progress", start_time_seconds=0, end_time_seconds=5.5, sequence=0),
            Topic(meeting_id=meeting.id, title="Backend API", start_time_seconds=6, end_time_seconds=12, sequence=1),
            Topic(meeting_id=meeting.id, title="Deployment", start_time_seconds=20, end_time_seconds=32, sequence=2)
        ]
        db.add_all(topics)

        # 7. Create Summary
        key_points = [
            {
                "sectionTitle": "Attendance and Setup",
                "items": [
                    {
                        "text": "Multiple attendees called by name",
                        "time": 64,  # 01:04
                        "subItems": [
                            "Sartak Jan confirmed present",
                            "Others include Shivangi, Anit, Vishal"
                        ]
                    },
                    {
                        "text": "Request for participants to settle down",
                        "time": 64,  # 01:04
                        "subItems": [
                            "Asked to get back to seats"
                        ]
                    },
                    {
                        "text": "Attendance check for Manipur, Jasmine",
                        "time": 70,  # 01:10
                        "subItems": [
                            "Names noted with unclear context"
                        ]
                    }
                ]
            },
            {
                "sectionTitle": "Communication and Interaction",
                "items": [
                    {
                        "text": "Speaker confusion and unclear responses",
                        "time": 80,  # 01:20
                        "subItems": []
                    }
                ]
            }
        ]
        summary = Summary(
            meeting_id=meeting.id,
            overview="The team discussed the progress of the backend API and frontend implementation, agreeing to deploy the new application by tomorrow morning.",
            key_points_json=json.dumps(key_points)
        )
        db.add(summary)

        # 8. Create Action Items
        action_items = [
            ActionItem(meeting_id=meeting.id, text="Complete frontend implementation", assignee_name="Khushi", assignee_participant_id=p1.id, status="open"),
            ActionItem(meeting_id=meeting.id, text="Monitor the deployment logs", assignee_name="Rahul", assignee_participant_id=p2.id, status="open"),
            ActionItem(meeting_id=meeting.id, text="Schedule final review meeting", assignee_name="Aman", assignee_participant_id=p3.id, status="open")
        ]
        db.add_all(action_items)

        db.commit()
        print("Database successfully seeded with mock meeting data!")
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
