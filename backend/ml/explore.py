import pandas as pd

df = pd.read_csv("data/student-mat.csv", sep=";")

print("First 5 rows:")
print(df.head())

print("\nDataset shape:")
print(df.shape)

print("\nColumns:")
print(df.columns)

print("\nDataset information:")
print(df.info())

print("\nStatistics:")
print(df.describe())