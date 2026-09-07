# Backend Architecture

## Stack
- Python
- FastAPI
- SQLAlchemy
- Pydantic
- SQLite

## Architectural Style

Use a modular monolith, not microservices.

```text
HTTP Request
    ↓
API Router
    ↓
Pydantic validation
    ↓
Service layer
    ↓
Repository layer
    ↓
SQLAlchemy
    ↓
SQLite
```

## Folder Structure

```text
backend/
├── app/
│   ├── main.py
│   ├── api/
│   │   ├── meetings.py
│   │   ├── transcripts.py
│   │   ├── summaries.py
│   │   └── actions.py
│   ├── models/
│   │   ├── meeting.py
│   │   ├── participant.py
│   │   ├── transcript_segment.py
│   │   ├── summary.py
│   │   ├── action_item.py
│   │   └── topic.py
│   ├── schemas/
│   ├── services/
│   ├── repositories/
│   ├── database/
│   ├── seed/
│   └── utils/
└── tests/
```

## Domain Services

### Meeting Service
- list meetings
- get meeting
- create meeting
- update meeting
- delete meeting
- filtering/sorting orchestration

### Transcript Service
- create transcript segments
- get transcript
- search transcript
- parse uploaded/pasted transcript

### Summary Service
- get summary
- create/update summary
- optional LLM generation

### Action Item Service
- list actions
- create
- update
- complete
- delete

### Participant Service
- resolve/create participants
- attach participants to meetings

### Topic Service
- list/create topics or chapters

### Search Service
- meeting search
- transcript search

## Router Rule
Routers should be thin. Do not put complex business logic or SQL queries directly in route handlers.

## Service Rule
Services coordinate business logic and transactions.

## Repository Rule
Repositories encapsulate database access.

## Validation
Use Pydantic request schemas for:
- create
- update
- query parameters where appropriate

## Errors
Use consistent HTTP responses:
- 400 invalid input
- 404 resource not found
- 409 conflict where meaningful
- 422 validation errors
- 500 unexpected server errors

## CORS
Allow the deployed/local Next.js origin through configuration, not hard-coded production assumptions.

## Seed
Provide deterministic seed data so a fresh database immediately contains realistic meetings.
