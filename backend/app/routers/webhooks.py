from fastapi import APIRouter, Request, BackgroundTasks
from ..services import transcription_service

router = APIRouter(prefix="/webhooks", tags=["webhooks"])

@router.post("/recall")
async def recall_webhook(request: Request, background_tasks: BackgroundTasks):
    payload = await request.json()
    # Process in background so Recall doesn't timeout the webhook
    background_tasks.add_task(transcription_service.process_webhook, payload)
    return {"status": "ok"}
