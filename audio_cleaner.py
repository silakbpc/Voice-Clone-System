import librosa
import soundfile as sf
import numpy as np


def clean_audio(input_path, output_path, target_sr=24000):

    # Ses dosyasını yükle
    y, sr = librosa.load(input_path, sr=target_sr)

    # Sessizlikleri temizle
    y, _ = librosa.effects.trim(y, top_db=20)

    # Normalize et
    max_amp = np.max(np.abs(y))
    if max_amp > 0:
        y = y / max_amp

    # Kaydet
    sf.write(output_path, y, target_sr)

    print(f"Temizlenmiş ses kaydedildi: {output_path}")


if __name__ == "__main__":
    clean_audio(
        "reference.wav",
        "clean_reference.wav"
    )