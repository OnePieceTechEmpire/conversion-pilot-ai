import { RiskFormData, RiskPredictionResult } from "@/types/risk";

export function getRiskLevel(score: number): "Low" | "Medium" | "High" {
  if (score >= 0.75) return "High";
  if (score >= 0.45) return "Medium";
  return "Low";
}

export function getRecommendedAction(riskLevel: "Low" | "Medium" | "High"): string {
  if (riskLevel === "High") return "Offer a limited-time discount and show a product bundle.";
  if (riskLevel === "Medium") return "Show best-selling related products and reinforce trust signals.";
  return "Maintain normal checkout flow and highlight free shipping or product reviews.";
}

export function getExplanation(data: RiskFormData, riskLevel: "Low" | "Medium" | "High"): string {
  const reasons: string[] = [];

  if (data.session_duration_min < 8) reasons.push("short session duration");
  if (data.device === "mobile") reasons.push("mobile device usage");
  if (data.num_unique_products <= 2) reasons.push("low browsing depth");
  if (data.source === "direct") reasons.push("direct traffic source");
  if (data.marketing_opt_in === 0) reasons.push("low marketing engagement");

  if (reasons.length === 0) {
    return `This session is classified as ${riskLevel.toLowerCase()} risk based on its browsing and customer profile patterns.`;
  }

  return `This session is classified as ${riskLevel.toLowerCase()} risk due to ${reasons.join(", ")}.`;
}

export function mockPredictRisk(data: RiskFormData): RiskPredictionResult {
  let score = 0.35;

  if (data.session_duration_min < 8) score += 0.18;
  if (data.device === "mobile") score += 0.12;
  if (data.source === "direct") score += 0.08;
  if (data.page_view <= 3) score += 0.12;
  if (data.num_events <= 4) score += 0.08;
  if (data.num_unique_products <= 2) score += 0.08;
  if (data.days_since_signup < 30) score += 0.07;
  if (data.marketing_opt_in === 0) score += 0.05;
  if (data.session_hour >= 22 || data.session_hour <= 1) score += 0.05;

  score = Math.max(0.05, Math.min(0.95, score));

  const riskLevel = getRiskLevel(score);

  return {
    abandonment_probability: score,
    risk_level: riskLevel,
    recommended_action: getRecommendedAction(riskLevel),
    explanation: getExplanation(data, riskLevel),
  };
}