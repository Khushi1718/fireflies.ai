import asyncio
import os
import httpx
from dotenv import load_dotenv
from typing import Optional

load_dotenv(os.path.join(os.path.dirname(__file__), "../../.env"))

def get_base_url():
    region = os.getenv("RECALL_REGION", "us-west-2")
    return f"https://{region}.recall.ai/api/v1/bot"

def get_headers():
    key = os.getenv("RECALL_API_KEY")
    if not key:
        raise ValueError("RECALL_API_KEY environment variable is not set.")
    return {
        "Authorization": f"Token {key}",
        "Content-Type": "application/json"
    }

async def create_bot(
    meeting_url: str,
    meeting_id: int,
    bot_name: str = "Fireflies.ai Notetaker Khushi"
) -> str:
    """
    Creates a bot in Recall.ai that joins the given meeting URL.
    Returns the bot ID.
    """
    key = os.getenv("RECALL_API_KEY")
    if not key:
        raise ValueError("RECALL_API_KEY environment variable is not set. Please set it to use Recall.ai.")
        
    payload = {
        "meeting_url": meeting_url,
        "bot_name": bot_name,
        "recording_config": {
            "transcript": {
                "provider": {
                    "recallai_streaming": {
                        "mode": "prioritize_low_latency",
                        "language_code": "en"
                    }
                },
                "diarization": {
                    "use_separate_streams_when_available": True
                }
            },
            "audio_mixed_mp3": {},
            "start_recording_on": "call_join"
        }
    }
    
    webhook_url = os.getenv("WEBHOOK_URL")
    if not webhook_url:
        raise ValueError("WEBHOOK_URL must point to a public Recall realtime webhook endpoint.")
    if not webhook_url.endswith("/webhooks/recall"):
        webhook_url = webhook_url.rstrip("/") + "/webhooks/recall"

    payload["chat"] = {
        "on_bot_join": {
            "send_to": "everyone",
            "pin": True,
            "message": (
                "Khushi Nain invited Fireflies.ai to record and take notes. "
                "By continuing, you agree to https://fireflies.ai/privacy. "
                "Fireflies is connected and recording this meeting."
            )
        }
    }
    payload["recording_config"]["realtime_endpoints"] = [
        {
            "type": "webhook",
            "url": webhook_url,
            "events": ["transcript.partial_data", "transcript.data"]
        }
    ]
    
    async with httpx.AsyncClient() as client:
        response = await client.post(get_base_url(), json=payload, headers=get_headers(), timeout=15.0)
        
        if response.status_code >= 400:
            raise Exception(f"Failed to create bot: {response.text}")
            
        data = response.json()
        return data.get("id")

async def send_chat_message(bot_id: str, message: str):
    """
    Attempts to send a chat message into the meeting. 
    Not all platforms (e.g. Google Meet) support this via Recall yet.
    """
    url = f"{get_base_url()}/{bot_id}/send_chat_message"
    payload = {"text": message}
    
    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=payload, headers=get_headers(), timeout=10.0)
        # We don't raise on failure because chat sending might not be supported.
        return response.status_code == 200

async def stop_bot(bot_id: str):
    """
    Forces the bot to leave the meeting.
    """
    url = f"{get_base_url()}/{bot_id}/leave_call"
    
    async with httpx.AsyncClient() as client:
        response = await client.post(url, json={}, headers=get_headers(), timeout=10.0)
        return response.status_code == 200

async def get_bot_status(bot_id: str) -> dict:
    url = f"{get_base_url()}/{bot_id}"
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=get_headers(), timeout=10.0)
        if response.status_code == 200:
            return response.json()
        return {}

async def get_bot_transcript(bot_id: str) -> list:
    url = f"{get_base_url()}/{bot_id}/transcript"
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=get_headers(), timeout=10.0)
        if response.status_code == 200:
            return response.json()
        return []


async def get_bot_audio_url(bot_id: str) -> Optional[str]:
    """Return Recall's completed mixed-audio download URL, when available."""
    data = await get_bot_status(bot_id)
    for recording in reversed(data.get("recordings", [])):
        shortcuts = recording.get("media_shortcuts") or {}
        audio = shortcuts.get("audio_mixed") or {}
        artifact_data = audio.get("data") or {}
        if artifact_data.get("download_url"):
            return artifact_data["download_url"]
    return None


async def wait_for_bot_audio_url(
    bot_id: str, attempts: int = 6, delay_seconds: float = 5.0
) -> Optional[str]:
    """Wait briefly for Recall to finish publishing the mixed MP3 artifact."""
    for attempt in range(attempts):
        audio_url = await get_bot_audio_url(bot_id)
        if audio_url:
            return audio_url
        if attempt < attempts - 1:
            await asyncio.sleep(delay_seconds)
    return None
