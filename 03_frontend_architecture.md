# Frontend Architecture

## Stack
- Next.js
- TypeScript
- React
- Tailwind CSS
- Component library if useful

## Folder Structure

```text
frontend/
├── app/
│   ├── page.tsx
│   ├── meetings/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   └── settings/
│       └── page.tsx
├── components/
│   ├── layout/
│   ├── meetings/
│   ├── transcript/
│   ├── player/
│   ├── summary/
│   ├── actions/
│   └── common/
├── services/
│   ├── meetings.ts
│   ├── transcripts.ts
│   ├── actions.ts
│   └── summaries.ts
├── hooks/
├── types/
├── lib/
└── styles/
```

## Component Responsibilities

### Layout
- `Sidebar`
- `Topbar`
- `WorkspaceLayout`

### Meetings
- `MeetingList`
- `MeetingRow`
- `MeetingSearch`
- `MeetingFilters`
- `MeetingSort`
- `CreateMeetingModal`

### Transcript
- `TranscriptPanel`
- `TranscriptSegment`
- `TranscriptSearch`

### Player
- `MeetingPlayer`

### Summary
- `SummaryPanel`
- `KeyPoints`
- `Topics`
- `Chapters`

### Actions
- `ActionItemList`
- `ActionItemRow`
- `ActionItemModal`

### Common
- `Modal`
- `Toast`
- `Button`
- `Skeleton`
- `EmptyState`
- `ErrorState`

## Data Flow

```text
Page
 ↓
Feature component
 ↓
Service function
 ↓
HTTP REST API
 ↓
FastAPI
```

Components should not hard-code backend URLs.

## State

Local UI state:
- Modal open/close
- Search input
- Selected transcript segment
- Player time
- Filter UI

Server state:
- Meetings
- Meeting detail
- Transcript
- Summary
- Action items

Avoid Redux unless there is a demonstrated need.

## Transcript Synchronization

### Segment → Player
```text
onSegmentClick(segment)
→ playerRef.current.currentTime = segment.start_time
→ player.play()
```

### Player → Segment
```text
timeupdate
→ currentTime
→ find segment where:
   start_time <= currentTime < end_time
→ setActiveSegment(segment.id)
```

## Search Highlighting
Keep original transcript text intact. Render matched ranges or split text around the query. Escape user input before creating any regex.

## Error Handling
Every API call should handle:
- loading
- success
- error

Show useful user-facing errors and log technical details appropriately.

## Accessibility
- Buttons must have accessible labels
- Keyboard-accessible modals
- Visible focus states
- Semantic headings
- Do not rely only on color for active state
