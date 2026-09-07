# Bonus Features

Bonus features are explicitly optional. Do not sacrifice mandatory functionality to implement them.

## Priority Order

### B1 — Global Search
Search across:
- meeting titles
- participants
- transcript text
- topics

Potential endpoint:
`GET /api/search?q=...`

### B2 — Ask a Question About a Meeting
UI:
- chat panel
- question input
- answer
- optionally cited transcript timestamps

Backend:
```text
question
→ retrieve relevant segments
→ construct context
→ LLM
→ grounded answer
```

Keep it optional and fail gracefully when no API key is configured.

### B3 — LLM Summary
Potential endpoint:
`POST /api/meetings/{id}/summary/generate`

Input:
- transcript

Output:
- overview
- key points
- actions
- topics

Seeded summaries remain the fallback.

### B4 — Tags / Topics Filtering
Add:
- tag entity or normalized topic relation
- filter endpoint
- tag chips in UI

### B5 — Comments
Add comments attached to transcript segments:
- author
- text
- segment
- created_at

### B6 — Highlights
Allow a user to highlight a transcript segment and store the highlight.

### B7 — Soundbites
Store:
- meeting_id
- start_time
- end_time
- title

Use player controls to play the selected interval.

### B8 — Export
Formats:
- TXT
- Markdown
- PDF

Keep exports generated from persisted data.

### B9 — Dark Mode
Use theme tokens rather than duplicating component styles.

## Bonus Implementation Rule
Each bonus must have:
- UI
- API if persistence is needed
- database changes if persistence is needed
- README documentation
- graceful failure

Do not implement fake bonus buttons that appear functional but do nothing.
