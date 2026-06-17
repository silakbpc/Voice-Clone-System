import os
import subprocess

root = "/Users/silakebapci/Desktop/Mezuniyet Projesi/Data"

for speaker in ["Erkek2"]:
    folder = os.path.join(root, speaker)

    for file in os.listdir(folder):
        if file.endswith(".m4a"):

            input_file = os.paEth.join(folder, file)

            output_file = os.path.join(
                folder,
                os.path.splitext(file)[0] + ".wav"
            )

            subprocess.run([
                "ffmpeg",
                "-i", input_file,
                "-ar", "22050",
                "-ac", "1",
                output_file,
                "-y"
            ])

print("Dönüşüm tamamlandı.")