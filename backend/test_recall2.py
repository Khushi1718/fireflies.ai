import asyncio
import httpx
import os
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("RECALL_API_KEY")
REGION = os.getenv("RECALL_REGION", "us-west-2")
BOT_ID = "4d1d5f88-9b94-4fe3-a207-91fa2f4580a5"

async def main():
    base_url = f"https://{REGION}.recall.ai/api/v1/bot"
    headers = {"Authorization": f"Token {API_KEY}", "accept": "application/json"}
    
    async with httpx.AsyncClient() as client:
        res = await client.get(f"{base_url}/{BOT_ID}/transcript", headers=headers)
        print("TRANSCRIPT RESPONSE:", res.json())

asyncio.run(main())
