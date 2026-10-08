import joblib
import pandas as pd


# ==========================================
# 1. LOAD TRAINED MODEL
# ==========================================

model = joblib.load("models/student_model.joblib")


# ==========================================
# 2. DEFINE FEATURES
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


# ==========================================
# 3. PREDICTION FUNCTION
# ==========================================

def predict_student(data):
    """
    Predict the final grade (G3) for a student.
    """

    # Convert input data into DataFrame
    input_data = pd.DataFrame([data])

    # Make sure features are in the correct order
    input_data = input_data[features]

    # Make prediction
    prediction = model.predict(input_data)

    # Get the predicted grade
    predicted_grade = prediction[0]

    return predicted_grade


# ==========================================
# 4. TEST THE MODEL
# ==========================================

if __name__ == "__main__":

    student = {
        "studytime": 2,
        "failures": 0,
        "absences": 4,
        "G1": 12,
        "G2": 13,
        "age": 16,
        "Medu": 3,
        "Fedu": 3,
        "traveltime": 1,
        "freetime": 3,
        "goout": 3,
        "health": 4,
    }

    result = predict_student(student)

    print("\n===== STUDENT PERFORMANCE PREDICTION =====")
    print("Predicted G3:", round(result, 2))