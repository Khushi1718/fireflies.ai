import os
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
from .db import engine, Base
from .routers import meetings, action_items, transcripts, webhooks
from .seed import seed_db

# Create tables and seed DB
Base.metadata.create_all(bind=engine)
seed_db()

app = FastAPI(title="Fireflies Clone API")

# Ensure uploads directory exists
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "../uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Mount uploads directory to serve media files
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=list(dict.fromkeys([
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        os.getenv("FRONTEND_URL", "http://localhost:3000").rstrip("/"),
    ])),
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$|^https://[a-z0-9-]+\.ngrok(-free)?\.app$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(meetings.router)
app.include_router(action_items.router)
app.include_router(transcripts.router)
app.include_router(webhooks.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Fireflies API"}


@app.get("/live/{meeting_id}")
def open_live_meeting(meeting_id: int):
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000").rstrip("/")
    return RedirectResponse(url=f"{frontend_url}/live/{meeting_id}")
