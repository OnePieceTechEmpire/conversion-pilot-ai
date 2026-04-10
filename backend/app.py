from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "cart_abandonment_model.pkl")

model = joblib.load(MODEL_PATH)


class PredictionInput(BaseModel):
    page_view: int
    num_events: int
    num_unique_products: int
    session_duration_min: float
    device: str
    source: str
    session_country: str
    age: int
    days_since_signup: int
    marketing_opt_in: int
    session_hour: int
    session_dayofweek: int


@app.get("/")
def root():
    return {"message": "API running"}


@app.post("/predict")
def predict(data: PredictionInput):

    input_df = pd.DataFrame([{
        "page_view": data.page_view,
        "num_events": data.num_events,
        "num_unique_products": data.num_unique_products,
        "session_duration_min": data.session_duration_min,
        "device": data.device,
        "source": data.source,
        "session_country": data.session_country,
        "age": data.age,
        "days_since_signup": data.days_since_signup,
        "marketing_opt_in": data.marketing_opt_in,
        "session_hour": data.session_hour,
        "session_dayofweek": data.session_dayofweek,
    }])

    probability = float(model.predict_proba(input_df)[0][1])

    if probability >= 0.75:
        risk_level = "High"
    elif probability >= 0.45:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    explanation = (
        f"This session is classified as {risk_level.lower()} risk based on "
        f"its browsing behavior, traffic source, device type, and customer context."
    )

    return {
        "abandonment_probability": probability,
        "risk_level": risk_level,
        "recommended_action": "Offer discount if High Risk",
        "explanation": explanation,
    }

    