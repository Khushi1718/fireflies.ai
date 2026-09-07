# Fireflies Clone — Scope & Feature Specification

## Purpose
Build a Fireflies-inspired post-meeting workspace for browsing meetings, reading/searching transcripts, reviewing AI notes, and managing action items.

## Scope Rule
The assignment is a post-meeting workflow clone. Real meeting capture, real-time transcription, integrations, authentication, and collaboration are not required.

## Mandatory Features

### 1. Meetings Library / Dashboard
- List past meetings
- Meeting title
- Date
- Duration
- Participants
- Search by title
- Filter by participant/date
- Sort by recency
- Fireflies-inspired navigation
- Profile/settings placeholders

### 2. Meeting Detail
- Meeting metadata
- Participants
- Media player placeholder/sample
- Interactive transcript
- Speaker labels
- Timestamps
- Transcript line click seeks player
- Player time highlights active transcript segment
- Search within transcript
- Highlight matching text

### 3. AI Summary & Notes
- Meeting overview/summary
- Key points
- Action items
- Topics / outline / chapters
- Seeded/mock AI content is acceptable
- LLM generation is optional

### 4. Meeting Management crud
- Create meeting
- Paste or upload transcript
- Edit title
- Edit participants
- Delete meeting
- Add action item
- Edit action item
- Complete/uncomplete action item
- Delete action item
- Persist all data

### 5. Fireflies Experience
- Sidebar/navigation
- Search
- Filters
- Forms
- Modals
- Toast notifications
- Loading states
- Error/empty states
- Settings placeholders
- Productivity-focused visual design

## Optional Bonus Features
Only implement after all mandatory features are stable:
- Ask a question about a meeting
- Global search across meetings
- Tags/topics filtering
- Comments
- Transcript highlights
- Soundbites
- Export TXT
- Export Markdown
- Export PDF
- LLM-powered summaries
- Dark mode

## Explicitly Out of Scope / Placeholder
- Real-time meeting bot
- Real speech-to-text
- Zoom/Google Meet/Teams/Webex integrations
- Calendar integration
- CRM integrations
- Team/sharing/collaboration
- Real authentication
- OAuth/SSO
- Billing
- Live meeting assistant

## Priority
P0 = mandatory workflow
P1 = UX polish
P2 = bonus
P3 = placeholder-only
