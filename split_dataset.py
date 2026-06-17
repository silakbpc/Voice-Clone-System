import pandas as pd
from sklearn.model_selection import train_test_split

INPUT_CSV = "/Users/silakebapci/Desktop/Mezuniyet Projesi/Data/metadata.csv"

df = pd.read_csv(
    INPUT_CSV,
    sep="|",
    header=None,
    names=["audio_file", "text", "speaker_name"]
)

train_df, val_df = train_test_split(
    df,
    test_size=0.05,
    random_state=42,
    shuffle=True
)

train_df.to_csv(
    "/Users/silakebapci/Desktop/Mezuniyet Projesi/Data/train_coqui.csv",
    index=False
)

val_df.to_csv(
    "/Users/silakebapci/Desktop/Mezuniyet Projesi/Data/val_coqui.csv",
    index=False
)

print("Train:", len(train_df))
print("Validation:", len(val_df))