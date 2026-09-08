# Fireflies.ai Clone

A full-stack meeting intelligence workspace inspired by Fireflies.ai. The application captures a meeting with Recall.ai, stores real transcript segments, generates Gemini-powered notes, provides AskFred context-aware Q&A, and plays the completed recording.

## What You Can Do

- Browse meetings in the meeting library.
- Start a capture from a Google Meet, Zoom, or Teams meeting URL.
- Watch live speaker transcript updates on the Live Meeting page.
- Ask AskFred questions from the home sidebar, standalone AskFred page, live meeting page, or meeting details page.
- Review AI summary, key points, topics, and action items.
- Play and seek the completed Recall recording from meeting details.
- Toggle action items and search transcript content.

## Project Layout

```text
frontend/   Next.js, React, Tailwind CSS user interface
backend/    FastAPI API, Recall integration, Gemini services, SQLite persistence
fireflies.db  Local SQLite database created/used by the backend
```

## Prerequisites

- Node.js 18 or newer
- Python 3.11 or newer
- A Google Gemini API key with available quota
- A Recall.ai API key for meeting capture
- A public backend URL for Recall webhooks when testing real captures

## Quick Start

Open two terminals from the repository root.

### 1. Configure the backend

Create `backend/.env`:

```env
# One or more Gemini keys. Comma-separated keys are tried in order on quota errors.
GEMINI_API_KEYS=first_key,second_key

RECALL_API_KEY=your_recall_api_key
RECALL_REGION=us-west-2

# Required for Recall webhooks and links shared in the meeting chat.
WEBHOOK_URL=https://your-public-backend-domain.com
PUBLIC_APP_URL=https://your-frontend-domain.com
FRONTEND_URL=https://your-frontend-domain.com
```

Never commit real API keys. The existing `.env` file is local configuration only.

### 2. Start the backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
./venv/bin/python -m uvicorn app.main:app --reload --port 8000
```

The API is available at `http://localhost:8000`. Swagger documentation is available at `http://localhost:8000/docs`.

### 3. Configure and start the frontend

For local development, create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Then start the frontend in a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Using the Application

### Capture a meeting

1. Open **Meetings** or **Home**.
2. Click **Capture**.
3. Enter a meeting name and the meeting URL.
4. Click **Start Capturing**.
5. Open the Live Meeting page. Recall joins the meeting and sends transcript events to the backend.
6. Use the **Transcript** tab for live speaker updates.
7. Use AskFred on the right to ask about the current meeting.
8. Click **End & Create Notes** when the meeting is finished.

### Review a completed meeting

After processing completes, open the meeting from the library. The details page contains:

- Real transcript segments with timestamps.
- Gemini-generated notes, topics, and action items when Gemini quota is available.
- AskFred grounded in that meeting's transcript and AI notes.
- A recording player backed by the Recall audio artifact.

### AskFred context

AskFred is available in four places:

1. Home sidebar: choose a meeting from the context dropdown.
2. Standalone `/askfred` page: choose a meeting from the context dropdown.
3. Meeting details: automatically uses the open meeting.
4. Live meeting: automatically uses the active meeting.

Changing the selected meeting starts a fresh chat context. AskFred sends the current transcript, persisted AI notes, and recent conversation history to Gemini. It does not use hardcoded answers.

## How the System Works

```text
Frontend
	|
	| REST + SSE
	v
FastAPI backend ---- Recall.ai meeting bot/webhooks
	|
	+---- SQLite: meetings, transcript segments, notes, topics, action items
	|
	+---- Gemini: transcript analysis, notes, AskFred answers
```

1. The frontend creates a meeting record and asks Recall to join the supplied meeting URL.
2. Recall sends transcript and lifecycle events to `POST /webhooks/recall`.
3. The backend stores transcript segments and broadcasts live updates over `GET /meetings/{id}/stream`.
4. Gemini analyzes the real transcript to generate structured notes.
5. When the meeting ends, Recall publishes a mixed MP3 artifact.
6. The backend proxies the recording through `GET /meetings/{id}/audio` with range support for browser playback.
7. AskFred reads the current meeting's stored transcript and notes before calling Gemini.

## Important API Routes

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/meetings` | List meetings |
| `POST` | `/meetings` | Create a meeting |
| `GET` | `/meetings/{id}` | Get meeting details |
| `POST` | `/meetings/{id}/start` | Start Recall capture |
| `POST` | `/meetings/{id}/stop` | End capture and finalize recording |
| `GET` | `/meetings/{id}/stream` | Live SSE updates |
| `GET` | `/meetings/{id}/audio` | Fresh proxied recording audio |
| `POST` | `/meetings/{id}/generate` | Generate notes from the stored transcript |
| `POST` | `/meetings/{id}/ask` | Ask Gemini about the meeting |
| `POST` | `/webhooks/recall` | Receive Recall events |

## Local Public Webhooks

Recall cannot call `localhost`. For local capture testing, run a public tunnel for port 8000 and use its URL as `WEBHOOK_URL`. Run a second tunnel for port 3000 if you need a public live page.

```bash
ngrok http 8000
ngrok http 3000
```

Update `backend/.env` with the current tunnel URLs, restart the backend, and restart the frontend after changing `frontend/.env.local`. Free ngrok URLs change whenever a tunnel restarts.

## Deployment

Deploy the two applications separately.

### Frontend on Vercel

Set the Vercel project root to `frontend/` and add:

```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

Build command:

```bash
npm run build
```

Do not upload the backend `.env` file or any secret keys to Vercel.

### Backend on Render

Create a Python web service with the root directory set to `backend/`.

Build command:

```bash
pip install -r requirements.txt
```

Start command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Set these Render environment variables:

```env
GEMINI_API_KEYS=first_key,second_key
RECALL_API_KEY=your_recall_api_key
RECALL_REGION=us-west-2
WEBHOOK_URL=https://your-backend.onrender.com
PUBLIC_APP_URL=https://your-vercel-app.vercel.app
FRONTEND_URL=https://your-vercel-app.vercel.app
```

Use the Render backend URL in Vercel's `NEXT_PUBLIC_API_URL`. Configure `WEBHOOK_URL` to the backend root; the application appends `/webhooks/recall` automatically.

## Troubleshooting

### AskFred or notes return a Gemini quota error

Multiple keys only provide extra capacity when they belong to projects with separate available quotas. Keys from the same Google Cloud project share the project quota. Enable billing or use a key from another project.

### Live page cannot load a meeting

Check that the frontend API URL points to the backend, the backend is running, and the browser can reach the backend URL. For local tunnels, restart the frontend after changing `.env.local`.

### Transcript is empty

Check the Recall webhook URL and ensure the public backend tunnel is running. The backend also polls Recall as a fallback, but a completed meeting with no transcript artifact cannot be reconstructed.

### Audio does not play

Audio is only available after Recall publishes the recording artifact. The backend exposes it through `/meetings/{id}/audio`; restart the backend after deployment and verify that the meeting is completed.

## Validation

```bash
cd frontend
npm run build
```

```bash
cd backend
python3 -m py_compile app/main.py app/routers/meetings.py app/services/meeting_bot_service.py
```
