import sys
import os
import numpy as np
import soundfile as sf

sys.path.insert(
    0,
    "/Users/silakebapci/Desktop/Mezuniyet Projesi/TTS"
)

from TTS.tts.configs.xtts_config import XttsConfig
from TTS.tts.models.xtts import Xtts

CONFIG_PATH = "/Users/silakebapci/Desktop/Mezuniyet Projesi/TTS/run/training/GPT_XTTS_v2.0_LJSpeech_FT-June-11-2026_04+37PM-dbf1a08a/config.json"

CHECKPOINT_DIR = "/Users/silakebapci/Desktop/Mezuniyet Projesi/TTS/run/training/GPT_XTTS_v2.0_LJSpeech_FT-June-11-2026_04+37PM-dbf1a08a"

VOCAB_PATH = "/Users/silakebapci/Library/Application Support/tts/tts_models--multilingual--multi-dataset--xtts_v2/vocab.json"

print("XTTS yükleniyor...")

config = XttsConfig()
config.load_json(CONFIG_PATH)

model = Xtts.init_from_config(config)

model.load_checkpoint(
    config,
    checkpoint_dir=CHECKPOINT_DIR,
    vocab_path=VOCAB_PATH,
)

def generate_voice(
    text: str,
    speaker_wav: str,
    output_path: str,
    
):
    
    print("================================")
    print("FINE TUNED MODEL CALISTI")
    print("TEXT:", text)
    print("================================")

    
    output_dir = os.path.dirname(output_path)

    if output_dir:
        os.makedirs(output_dir, exist_ok=True)

    outputs = model.synthesize(
        text=text,
        config=config,
        speaker_wav=speaker_wav,
        language="tr",
    )

    sf.write(
        output_path,
        np.array(outputs["wav"]),
        24000,
    )

    return output_path
