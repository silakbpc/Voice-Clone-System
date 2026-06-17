import os
import re

input_file = "/Users/silakebapci/Desktop/Yapıştırılan metin.txt"
output_folder = "txt"

os.makedirs(output_folder, exist_ok=True)

with open(input_file, "r", encoding="utf-8") as f:
    lines = f.readlines()

for line in lines:
    line = line.strip()

    if not line:
        continue

    match = re.match(r"(\d+)\.\s*(.*)", line)

    if match:
        number = int(match.group(1))
        text = match.group(2)

        filename = os.path.join(
            output_folder,
            f"{number:03d}.txt"
        )

        with open(filename, "w", encoding="utf-8") as txt_file:
            txt_file.write(text)
