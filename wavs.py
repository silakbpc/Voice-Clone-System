import pandas as pd

for file in ["train_final.csv", "val_final.csv"]:
    path = f"/Users/silakebapci/Desktop/Mezuniyet Projesi/Data/{file}"

    df = pd.read_csv(path, sep="|", header=None)

    df[0] = "wavs/" + df[0].astype(str)

    df.to_csv(path, sep="|", header=False, index=False)
