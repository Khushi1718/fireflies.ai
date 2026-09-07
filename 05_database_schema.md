# Database Schema

## Database
SQLite.

## Core Entities

### meetings
- `id` PK
- `title`
- `description` nullable
- `meeting_date`
- `duration_seconds`
- `created_at`
- `updated_at`

### participants
- `id` PK
- `name`
- `email` nullable
- `created_at`

### meeting_participants
- `meeting_id` FK → meetings.id
- `participant_id` FK → participants.id
- composite PK `(meeting_id, participant_id)`

### transcript_segments
- `id` PK
- `meeting_id` FK → meetings.id
- `speaker_name`
- `start_time`
- `end_time`
- `text`
- `sequence`
- index on `(meeting_id, sequence)`
- index on `(meeting_id, start_time)`

### summaries
- `id` PK
- `meeting_id` FK → meetings.id, UNIQUE
- `overview`
- `created_at`
- `updated_at`

### action_items
- `id` PK
- `meeting_id` FK → meetings.id
- `title`
- `description` nullable
- `assignee` nullable
- `due_date` nullable
- `status`
- `created_at`
- `updated_at`
- index on `(meeting_id, status)`

### topics
- `id` PK
- `meeting_id` FK → meetings.id
- `name`
- `start_time` nullable
- `end_time` nullable
- `sequence`

## Relationships

```text
Meeting 1 ───── N TranscriptSegment
Meeting 1 ───── 1 Summary
Meeting 1 ───── N ActionItem
Meeting 1 ───── N Topic
Meeting N ───── N Participant
```

## Why Transcript Segments Are Separate
A single transcript blob would make timestamp seeking, speaker display, search, and future analytics harder. Segments provide natural units for UI interaction and querying.

## Why Participants Are Separate
A participant can appear in many meetings. Normalizing them avoids repeating the same person data.

## Why Summary Is One-to-One
A meeting has one current canonical summary for this assignment.

## Delete Behavior
Recommended:
- Deleting a meeting deletes its transcript segments, summary, action items, topics, and meeting-participant links.
- Participant records can remain if shared by other meetings.

Use foreign keys and ORM cascade behavior carefully.

## Indexing
Important indexes:
- meetings.meeting_date
- transcript_segments `(meeting_id, sequence)`
- transcript_segments `(meeting_id, start_time)`
- action_items `(meeting_id, status)`

## Future Migration
SQLite can later be replaced by PostgreSQL without changing the domain model significantly.
