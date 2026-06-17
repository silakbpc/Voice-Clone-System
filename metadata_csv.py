import os
import csv
import re

DATA_DIR = "/Users/silakebapci/Desktop/Mezuniyet Projesi/Data"

TXT_DIR = os.path.join(DATA_DIR, "txt")
WAVS_DIR = os.path.join(DATA_DIR, "wavs")

metadata = []

def natural_sort(files):
    def convert(text):
        return int(text) if text.isdigit() else text.lower()

    def key_func(key):
        return [convert(c) for c in re.split(r'([0-9]+)', key)]

    return sorted(files, key=key_func)

txt_files = natural_sort(
    [f for f in os.listdir(TXT_DIR) if f.endswith(".txt")]
)

speakers = {
    "Erkek1": "erkek1",
    "Kadın1": "kadin1",
    "Kadın2": "kadin2",
    "Erkek2": "erkek2"
}

for folder_name, speaker_name in speakers.items():

    speaker_folder = os.path.join(WAVS_DIR, folder_name)

    wav_files = natural_sort(
        [f for f in os.listdir(speaker_folder) if f.endswith(".wav")]
    )

    if len(wav_files) != len(txt_files):
        print(
            f"UYARI: {folder_name} -> "
            f"{len(wav_files)} wav, "
            f"{len(txt_files)} txt"
        )

    count = min(len(wav_files), len(txt_files))

    for i in range(count):

        txt_path = os.path.join(TXT_DIR, txt_files[i])

        with open(txt_path, "r", encoding="utf-8") as f:
            text = f.read().strip()

        audio_rel_path = f"{folder_name}/{wav_files[i]}"

        metadata.append([
            audio_rel_path,
            text,
            speaker_name
        ])

metadata_path = os.path.join(DATA_DIR, "metadata.csv")

with open(metadata_path, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f, delimiter="|")
    writer.writerows(metadata)

print(f"{len(metadata)} satır metadata oluşturuldu.")
print(f"Kaydedildi: {metadata_path}")