# Fireflies.ai Clone - Backend Architecture

This is the FastAPI backend for the Fireflies.ai SDE Fullstack Assignment clone. It handles meeting lifecycle management, audio file storage, Google Gemini AI pipeline orchestration, and SQLite persistence.

## System Architecture

The application follows a standard Next.js (Client) -> FastAPI (Server) -> SQLite (Database) flow, with an external dependency on Google Gemini for AI operations.

**Important Note:** *Real-time bot joining Google Meet/Zoom is intentionally out of scope for this assignment.* The implemented capture/transcription workflow uses the assignment-approved audio/mock/demo approach rather than attempting to replicate Fireflies' proprietary meeting-bot infrastructure. When a user creates a meeting, the system accepts a mock URL and provides a UI to transition state. Upon stopping the meeting, an uploaded audio file (or a demo file fallback) is submitted for AI processing.

## Frontend Architecture
The frontend is built using Next.js 15, React, and TailwindCSS. It implements the complex layout structure of Fireflies.ai (Sidebar, Smart Search, Notes Panel, AskFred/Transcript toggle). 
- It uses React state for UI orchestration.
- The `MediaPlayer` dynamically syncs with the active transcript segment using `seekTime` logic.
- AskFred chat history is maintained statelessly in the client.

## FastAPI Architecture
The backend is a stateless, modular FastAPI application.
- `app/main.py`: Entry point, configures CORS, mounts the `/uploads` directory for static audio serving, and registers routers.
- `app/routers/`: Domain-specific API groupings (`meetings`, `transcripts`, `action_items`).
- `app/services/`: External integrations, primarily `gemini_service.py` for AI orchestration.
- `app/models.py` & `schemas.py`: SQLAlchemy ORM definitions and Pydantic validation schemas.

## Database Architecture
The application uses SQLite (`fireflies.db`) as the single source of truth. 
### Relationships:
- **Meeting**: The core entity.
- **TranscriptSegment**: Belongs to a Meeting. Stores precise timestamps, speaker diarization, and text.
- **Summary**: Belongs to a Meeting. Stores the overarching summary and a structured `key_points_json` string that strictly models the frontend hierarchical Notes tree.
- **Topic**: Belongs to a Meeting. Stores time-bounded chapters.
- **ActionItem**: Belongs to a Meeting. Stores tasks, assignees, and completion statuses.

## AI Architecture & Gemini Integration
The project relies on Google Gemini for meeting intelligence, completely isolated on the backend. No API keys are exposed to the client.

### Transcript Pipeline
1. `POST /meetings/{id}/transcript/generate` is triggered.
2. The audio file is uploaded to the **Gemini File API**.
3. **Gemini 1.5 Pro Multimodal** processes the audio and returns a structured JSON transcript with timestamps and speakers.
4. The backend parses this and saves to the `TranscriptSegment` table.
5. The full transcript text is constructed and sent to **Gemini 1.5 Flash**.
6. The Flash model generates a highly specific, normalized JSON outline containing a Summary, Topics, and Action Items.
7. The DB is fully populated in a single atomic transaction.

### AskFred Pipeline
1. `POST /meetings/{id}/ask` is triggered with a user question.
2. The backend queries SQLite for all `TranscriptSegment`s for that meeting and rebuilds the text.
3. The context + question is sent to **Gemini 1.5 Flash**.
4. The system prompt explicitly enforces strict data boundaries: AskFred must *only* answer using the provided transcript context and explicitly state if the information is missing. It will never invent details.

## API List
- `GET /meetings` (Accepts optional `?q=` for global title search)
- `POST /meetings`
- `GET /meetings/{id}`
- `PATCH /meetings/{id}`
- `DELETE /meetings/{id}`
- `POST /meetings/{id}/start`
- `POST /meetings/{id}/pause`
- `POST /meetings/{id}/resume`
- `POST /meetings/{id}/stop`
- `POST /meetings/{id}/audio` (File upload)
- `POST /meetings/{id}/transcript/generate`
- `GET /meetings/{id}/transcript/search?q=`
- `POST /meetings/{id}/ask`
- `POST /action-items`
- `PATCH /action-items/{id}`
- `DELETE /action-items/{id}`

## Environment Variables

To fully utilize the AI transcription, AskFred, and summary features, you must provide a valid Google Gemini API Key.

Set this in your environment before starting the backend:
```bash
export GEMINI_API_KEY="your_api_key_here"
```

For automatic quota rotation, provide multiple comma-separated keys instead. AskFred tries the next key when the current key returns a quota or rate-limit error:
```bash
GEMINI_API_KEYS="first_api_key,second_api_key"
```

If both variables are set, keys from `GEMINI_API_KEYS` are tried first and the legacy `GEMINI_API_KEY` is included afterward. If no key is configured, the backend will gracefully start, but attempting to generate a transcript or ask Fred will return a validation error.

## Local Setup & Testing Instructions

1. **Start the Frontend**:
```bash
cd frontend
npm install
npm run dev
```

2. **Start the Backend**:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
export GEMINI_API_KEY="your_key"
uvicorn app.main:app --reload --port 8000
```
*(The SQLite DB will automatically be created and seeded on startup)*

3. **Testing the Flow**:
- Open `http://localhost:3000/meetings`.
- Click **Capture**, provide a meeting title/URL, and click **Start Capturing**.
- On the live meeting UI, click **Stop & Save**.
- Wait for the "Processing AI Transcript..." loading state (approx 30s).
- You will be redirected to the Meeting Detail page. Test audio playback, transcript syncing, Action Item toggling, global/transcript searching, and AskFred.

## Important Assumptions & Limitations
- **Mock Audio**: In the absence of an explicit file upload from the UI (which requires a complex recorder), the backend seamlessly falls back to transcribing a local `demo_meeting.mp3`.
- **AskFred Statelessness**: To avoid overengineering and out-of-scope database migrations, AskFred chat history is maintained purely in React state. The backend isolates each request statelessly.
- **SQLite Concurrency**: SQLite is used for simplicity and portability. In a production environment with heavy parallel transcription processing, a migration to PostgreSQL would be necessary to handle concurrent writes without locking issues.
