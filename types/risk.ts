export type RiskFormData = {
  page_view: number;
  num_events: number;
  num_unique_products: number;
  session_duration_min: number;
  device: "mobile" | "desktop" | "tablet";
  source: "organic" | "direct" | "email";
  session_country: string;
  age: number;
  days_since_signup: number;
  marketing_opt_in: 0 | 1;
  session_hour: number;
  session_dayofweek: number;
};

export type RiskPredictionResult = {
  abandonment_probability: number;
  risk_level: "Low" | "Medium" | "High";
  recommended_action: string;
  explanation: string;
};