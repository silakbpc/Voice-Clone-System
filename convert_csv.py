import pandas as pd

DATA_PATH = "/Users/silakebapci/Desktop/Mezuniyet Projesi/Data"

def convert_file(input_csv, output_csv):
    df = pd.read_csv(input_csv)

    df["audio_file"] = (
        df["audio_file"]
        .str.replace("wavs/", "", regex=False)
        .str.replace(".wav", "", regex=False)
    )

    df.to_csv(
        output_csv,
        sep="|",
        header=False,
        index=False
    )

convert_file(
    f"{DATA_PATH}/train_coqui.csv",
    f"{DATA_PATH}/train_final.csv"
)

convert_file(
    f"{DATA_PATH}/val_coqui.csv",
    f"{DATA_PATH}/val_final.csv"
)
