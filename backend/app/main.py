from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import StudentInput
from ml.predict import predict_student


app = FastAPI(
    title="Student Performance Prediction API",
    description="ML API for predicting student final performance",
    version="1.0.0"
)


# Allow requests from Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Student Performance Prediction API is running"
    }


@app.post("/predict")
def predict(student: StudentInput):

    predicted_grade = predict_student(
        student.model_dump()
    )

    return {
        "predicted_grade": round(float(predicted_grade), 2)
    }