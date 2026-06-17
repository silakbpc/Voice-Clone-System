from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel

import shutil
import os
import subprocess

from xtts_service import generate_voice

app = FastAPI()


class GenerateRequest(BaseModel):
    text: str


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Backend çalışıyor"}


def convert_to_wav(input_path: str, output_path: str):
    command = [
        "ffmpeg",
        "-y",
        "-i", input_path,
        "-ar", "24000",
        "-ac", "1",
        output_path,
    ]

    subprocess.run(command, check=True)


@app.post("/upload-audio")
async def upload_audio(file: UploadFile = File(...)):
    os.makedirs("uploads", exist_ok=True)
    os.makedirs("outputs", exist_ok=True)

    uploaded_file_path = "uploads/recording.m4a"
    wav_file_path = "uploads/recording.wav"

    with open(uploaded_file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print("1 - M4A dosyası geldi")

    convert_to_wav(
        uploaded_file_path,
        wav_file_path
    )

    print("2 - WAV dosyası oluşturuldu:", wav_file_path)

    return {
        "status": "success",
        "uploaded_audio": uploaded_file_path,
        "wav_audio": wav_file_path
    }


@app.post("/generate")
def generate(data: GenerateRequest):

    print("================================")
    print("FINE TUNED XTTS ÇAĞRILDI")
    print("Metin:", data.text)
    print("================================")

    generate_voice(
        text=data.text,
        speaker_wav="/Users/silakebapci/Desktop/Mezuniyet Projesi/uploads/recording.wav",
        output_path="/Users/silakebapci/Desktop/Mezuniyet Projesi/outputs/output.wav",
    )

    print("SES ÜRETİLDİ")

    return {
        "status": "success",
        "message": "Ses üretildi",
        "audio_url": "http://127.0.0.1:8000/audio"
    }


@app.get("/audio")
def get_audio():
    return FileResponse(
        path="outputs/output.wav",
        media_type="audio/wav",
        filename="output.wav"
    )