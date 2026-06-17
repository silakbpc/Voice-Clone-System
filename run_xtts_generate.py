import sys
import os
import json
import numpy as np
import soundfile as sf

sys.path.insert(0, "/Users/silakebapci/Desktop/Mezuniyet Projesi/TTS")

from TTS.tts.configs.xtts_config import XttsConfig
from TTS.tts.models.xtts import Xtts


CONFIG_PATH = "/Users/silakebapci/Desktop/Mezuniyet Projesi/TTS/run/training/GPT_XTTS_v2.0_LJSpeech_FT-June-11-2026_04+37PM-dbf1a08a/config.json"
CHECKPOINT_PATH = "/Users/silakebapci/Desktop/Mezuniyet Projesi/TTS/run/training/GPT_XTTS_v2.0_LJSpeech_FT-June-11-2026_04+37PM-dbf1a08a"
VOCAB_PATH = "/Users/silakebapci/Library/Application Support/tts/tts_models--multilingual--multi-dataset--xtts_v2/vocab.json"

TEXT_FILE = "temp_text.json"
SPEAKER_WAV = "uploads/recording.wav"
OUTPUT_FILE = "outputs/output.wav"

os.makedirs("outputs", exist_ok=True)

with open(TEXT_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

text = data["text"]

print("XTTS modeli yükleniyor...")

config = XttsConfig()
config.load_json(CONFIG_PATH)

model = Xtts.init_from_config(config)

model.load_checkpoint(
    config,
    checkpoint_dir=CHECKPOINT_PATH,
    vocab_path=VOCAB_PATH,
    use_deepspeed=False,
)

print("Ses üretiliyor...")

outputs = model.synthesize(
    text=text,
    config=config,
    speaker_wav=SPEAKER_WAV,
    language="tr",
)

wav = np.array(outputs["wav"])

sf.write(
    OUTPUT_FILE,
    wav,
    24000
)

print("Bitti ->", OUTPUT_FILE)