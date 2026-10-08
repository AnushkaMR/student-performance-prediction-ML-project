import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import cross_val_score, KFold

# ==========================================
# 1. LOAD DATASET
# ==========================================

df = pd.read_csv("data/student-mat.csv", sep=";")


# ==========================================
# 2. SELECT FEATURES
# ==========================================

features = [
    "studytime",
    "failures",
    "absences",
    "G1",
    "G2",
    "age",
    "Medu",
    "Fedu",
    "traveltime",
    "freetime",
    "goout",
    "health",
]

target = "G3"


X = df[features]
y = df[target]


# ==========================================
# 3. SPLIT DATA
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


print("Training samples:", len(X_train))
print("Testing samples:", len(X_test))


# ==========================================
# 4. TRAIN MODEL
# ==========================================

model = LinearRegression()

model.fit(X_train, y_train)


# ==========================================
# 5. MAKE PREDICTIONS
# ==========================================

predictions = model.predict(X_test)


# ==========================================
# 6. EVALUATE MODEL
# ==========================================

mae = mean_absolute_error(y_test, predictions)
mse = mean_squared_error(y_test, predictions)
rmse = mse ** 0.5
r2 = r2_score(y_test, predictions)


print("\n===== MODEL PERFORMANCE =====")

print("MAE:", round(mae, 2))
print("MSE:", round(mse, 2))
print("RMSE:", round(rmse, 2))
print("R² Score:", round(r2, 2))

# ==========================================
# 7. TRAIN RANDOM FOREST
# ==========================================

rf_model = RandomForestRegressor(
    n_estimators=200,
    random_state=42
)

rf_model.fit(X_train, y_train)


# ==========================================
# 8. RANDOM FOREST PREDICTIONS
# ==========================================

rf_predictions = rf_model.predict(X_test)


# ==========================================
# 9. RANDOM FOREST EVALUATION
# ==========================================

rf_mae = mean_absolute_error(y_test, rf_predictions)

rf_mse = mean_squared_error(y_test, rf_predictions)

rf_rmse = rf_mse ** 0.5

rf_r2 = r2_score(y_test, rf_predictions)

rf_r2 = r2_score(y_test, rf_predictions)



print("\n===== RANDOM FOREST PERFORMANCE =====")

print("MAE:", round(rf_mae, 2))
print("MSE:", round(rf_mse, 2))
print("RMSE:", round(rf_rmse, 2))
print("R² Score:", round(rf_r2, 2))
print("R² Score:", round(rf_r2, 2))

# ==========================================
# 10. FEATURE IMPORTANCE
# ==========================================

importance = rf_model.feature_importances_

feature_importance = pd.DataFrame({
    "Feature": features,
    "Importance": importance
})

feature_importance = feature_importance.sort_values(
    by="Importance",
    ascending=False
)

print("\n===== FEATURE IMPORTANCE =====")

print(feature_importance)

# ==========================================
# 10. 5-FOLD CROSS VALIDATION
# ==========================================

kf = KFold(
    n_splits=5,
    shuffle=True,
    random_state=42
)

cv_scores = cross_val_score(
    rf_model,
    X,
    y,
    cv=kf,
    scoring="r2"
)

print("\n===== 5-FOLD CROSS VALIDATION =====")

print("Fold R² Scores:")

for i, score in enumerate(cv_scores, start=1):
    print(f"Fold {i}: {score:.2f}")

print("Average R²:", round(cv_scores.mean(), 2))
print("Standard Deviation:", round(cv_scores.std(), 2))

# ==========================================
# FINAL MODEL
# ==========================================

print("\n===== TRAINING FINAL MODEL =====")

final_model = RandomForestRegressor(
    n_estimators=200,
    random_state=42
)

# Train using the complete dataset
final_model.fit(X, y)

print("Final model trained using all data.")

# ==========================================
# SAVE MODEL
# ==========================================

import joblib

joblib.dump(
    final_model,
    "models/student_model.joblib"
)

print("Model saved successfully!")
print("Location: models/student_model.joblib")