# Data Flows & Use Cases

## Use Case 1 — Browse Meetings

```text
User opens /meetings
→ Next.js requests GET /api/meetings
→ FastAPI validates query params
→ MeetingService
→ MeetingRepository
→ SQLite
→ JSON response
→ MeetingList renders
```

## Use Case 2 — Search Meetings

```text
User types "product"
→ frontend debounces or submits search
→ GET /api/meetings?search=product
→ repository filters title/participant as designed
→ matching meetings returned
```

## Use Case 3 — Open Meeting

```text
User clicks meeting
→ /meetings/{id}
→ GET /api/meetings/{id}
→ backend returns meeting data
→ detail page renders player, transcript, summary, actions
```

## Use Case 4 — Transcript Click

```text
User clicks segment
→ segment.start_time
→ player.currentTime = start_time
→ player plays
→ active segment state updates
```

## Use Case 5 — Player → Transcript

```text
HTML5 player emits timeupdate
→ currentTime
→ find segment:
   start_time <= currentTime < end_time
→ activeSegmentId
→ transcript scrolls/highlights
```

## Use Case 6 — Transcript Search

```text
User searches "authentication"
→ GET transcript/search
→ backend returns matching segments
→ frontend highlights matches
→ user clicks match
→ player seeks
```

## Use Case 7 — Create Meeting

```text
User submits form
→ validate client-side
→ POST /meetings
→ FastAPI validates
→ transaction:
   create meeting
   resolve participants
   parse transcript
   create segments
   create optional summary/actions/topics
→ commit
→ response
→ toast
→ navigate to meeting
```

## Use Case 8 — Edit Meeting

```text
Edit modal
→ PUT /meetings/{id}
→ database update
→ refreshed UI
→ success toast
```

## Use Case 9 — Delete Meeting

```text
Delete
→ confirmation modal
→ DELETE /meetings/{id}
→ cascade dependent records
→ redirect to library
→ toast
```

## Use Case 10 — Complete Action Item

```text
checkbox
→ PUT /actions/{id}
→ status = completed
→ UI updates
→ toast
```

## Use Case 11 — Seed Data

On development startup/setup:
```text
create tables
→ check whether data exists
→ insert deterministic sample meetings
→ insert transcripts
→ insert summaries
→ insert actions/topics
```

## Optional Use Case — AskFred

```text
User question
→ POST /meetings/{id}/ask
→ retrieve relevant transcript/summary context
→ LLM
→ answer with grounded context
```

Only implement after P0/P1.
