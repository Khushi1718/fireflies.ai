# REST API Specification

Base URL:
`/api`

## Meetings

### GET `/meetings`
List meetings.

Query parameters:
- `search`
- `participant_id`
- `date_from`
- `date_to`
- `sort` (`newest`, `oldest`, `longest`, `shortest`)
- `page`
- `page_size`

Response:
```json
{
  "items": [],
  "total": 0,
  "page": 1,
  "page_size": 20
}
```

### GET `/meetings/{meeting_id}`
Return meeting detail including participants, summary, topics, action items, and transcript or a documented subset.

### POST `/meetings`
Create a meeting from metadata and transcript input.

Example:
```json
{
  "title": "Product Planning",
  "meeting_date": "2026-09-05T10:30:00",
  "participants": [
    {"name": "Khushi", "email": null}
  ],
  "transcript": "00:00 Khushi: Let's start."
}
```

### PUT `/meetings/{meeting_id}`
Update meeting metadata.

### DELETE `/meetings/{meeting_id}`
Delete a meeting and dependent content.

## Transcript

### GET `/meetings/{meeting_id}/transcript`
Return ordered transcript segments.

### GET `/meetings/{meeting_id}/transcript/search?q=authentication`
Return matching transcript segments and match metadata.

## Summary

### GET `/meetings/{meeting_id}/summary`
Return summary.

### POST `/meetings/{meeting_id}/summary`
Create/replace a summary. Optional LLM generation can use a separate endpoint.

### PUT `/meetings/{meeting_id}/summary`
Update summary.

## Action Items

### GET `/meetings/{meeting_id}/actions`
List action items.

### POST `/meetings/{meeting_id}/actions`
Create action item.

### PUT `/actions/{action_id}`
Edit/complete action item.

### DELETE `/actions/{action_id}`
Delete action item.

## Topics

### GET `/meetings/{meeting_id}/topics`
Return topics/chapters ordered by sequence.

## Health

### GET `/health`
Response:
```json
{"status": "ok"}
```

## API Principles
- RESTful resource naming
- JSON request/response
- HTTP status codes used correctly
- Validation at API boundary
- No database objects exposed directly
- Consistent error response

## Error Format
Recommended:
```json
{
  "detail": "Meeting not found"
}
```

## API Documentation
FastAPI's generated OpenAPI/Swagger documentation should be available during development.
