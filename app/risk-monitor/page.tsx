"use client";

import { useState } from "react";
import RiskForm from "@/components/RiskForm";
import PredictionCard from "@/components/PredictionCard";
import { RiskPredictionResult } from "@/types/risk";

export default function RiskMonitorPage() {
  const [result, setResult] = useState<RiskPredictionResult | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Risk Monitor</h2>
        <p className="mt-2 text-slate-600">
          Predict cart abandonment risk for an active shopping session using behavioral and customer context signals.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RiskForm onPrediction={setResult} />
        </div>
        <div>
          <PredictionCard result={result} />
        </div>
      </div>
    </div>
  );
}