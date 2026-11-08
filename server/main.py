import json

from dotenv import load_dotenv

load_dotenv()  # must run before importing roast, which reads GEMINI_API_KEY

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from analysis import build_stats, clean_entries
from roast import generate_roast

MAX_UPLOAD_MB = 50

app = FastAPI(title="RoastMyTube API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # add your Vercel URL when deployed
    allow_methods=["POST"],
    allow_headers=["*"],
)


@app.get("/")
def health():
    return {"status": "ok"}


@app.post("/roast/history")
async def roast_history(
    file: UploadFile = File(...),
    tz_offset: int = Form(0),
    intensity: str = Form("honest"),
):
    data = await file.read()
    if len(data) > MAX_UPLOAD_MB * 1024 * 1024:
        raise HTTPException(413, f"File is over {MAX_UPLOAD_MB} MB.")

    try:
        raw = json.loads(data)
    except json.JSONDecodeError:
        raise HTTPException(400, "That isn't valid JSON. Upload watch-history.json.")

    if not isinstance(raw, list):
        raise HTTPException(400, "Unexpected format. Upload watch-history.json from Takeout.")

    videos = clean_entries(raw)
    if len(videos) < 10:
        raise HTTPException(422, "Not enough watch history to roast.")

    stats = build_stats(videos, tz_offset)
    roast = await generate_roast(stats, intensity)

    # Nothing is stored: the file and stats are discarded after the response
    return {"roast": roast, "stats": stats}