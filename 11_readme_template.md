# Meeting Notes & Transcription Platform

A Fireflies-inspired full-stack meeting notes and transcription workspace built as an SDE assignment.

## Features
- Meeting library
- Search/filter/sort
- Interactive transcript
- Speaker labels and timestamps
- Transcript/player synchronization
- Transcript search and highlighting
- AI-style summaries
- Topics/chapters
- Action item management
- Meeting CRUD
- Persistent SQLite database
- Fireflies-inspired productivity UI

## Tech Stack
### Frontend
- Next.js
- TypeScript
- React
- Tailwind CSS

### Backend
- Python
- FastAPI
- SQLAlchemy
- Pydantic

### Database
- SQLite

## Architecture

```text
Browser
  ↓
Next.js
  ↓ REST/JSON
FastAPI
  ↓
Service Layer
  ↓
Repository Layer
  ↓
SQLAlchemy
  ↓
SQLite
```

## Why a Modular Monolith?
The application is small enough that microservices would add operational complexity without providing meaningful benefit. Domain services keep responsibilities separated while the backend remains easy to run and deploy.

## Database Schema
See `05_database_schema.md`.

## API
See `06_api_specification.md`.

## Data Flow
See `07_data_flow_and_use_cases.md`.

## Mocked Transcription
Real speech-to-text is out of scope. The app uses seeded transcripts and accepts pasted/uploaded transcript content.

## Assumptions
- Default logged-in user
- SQLite is sufficient for the assignment
- Sample media is used for playback
- AI summaries can be seeded
- External integrations are placeholders

## Trade-offs
- SQLite instead of PostgreSQL because the assignment specifies SQLite
- REST instead of GraphQL because resources map cleanly to REST
- Modular monolith instead of microservices because of assignment scope
- Mock transcription instead of real STT because STT is explicitly out of scope

## Future Scaling
For production:
- SQLite → PostgreSQL
- local media → object storage such as S3
- synchronous processing → background queue
- SQLite text search → PostgreSQL FTS/Elasticsearch/OpenSearch where justified
- seeded AI → production LLM pipeline
- placeholder integrations → OAuth/API integrations

## Local Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Document exact environment variables in the final implementation.

## Deployment
Document:
- frontend hosting
- backend hosting
- API URL
- CORS configuration
- database persistence considerations

## Original Work
The application is an original implementation inspired by the general UX category of AI meeting assistants. Do not copy source code, proprietary assets, or private implementation details from Fireflies or other repositories.
