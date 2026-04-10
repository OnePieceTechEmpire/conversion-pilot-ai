"use client";

import { useRouter } from "next/navigation";

type PredictionCardProps = {
  result: any;
};

export default function PredictionCard({ result }: PredictionCardProps) {
  const router = useRouter();

  if (!result) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold">Prediction Result</h3>
        <p className="mt-4 text-slate-500">
          Submit the session details to generate prediction.
        </p>
      </div>
    );
  }

  const percentage = Math.round(result.abandonment_probability * 100);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 space-y-5">
      <h3 className="text-lg font-semibold">Prediction Result</h3>

      <div>
        <p className="text-sm text-slate-500">Abandonment Probability</p>
        <p className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
  {percentage}%
</p>
      </div>

      <div>
<span
  className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${
    result.risk_level === "High"
      ? "bg-red-100 text-red-700"
      : result.risk_level === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700"
  }`}
>
  {result.risk_level} Risk
</span>
      </div>

      <p className="text-slate-600">{result.explanation}</p>

      <div>
        <p className="text-sm text-slate-500">Recommended Action</p>
        <p className="font-medium">{result.recommended_action}</p>
      </div>

      <button
        onClick={() => router.push("/recovery-center")}
        className="w-full bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-xl py-3 font-medium hover:scale-[1.02] transition-all duration-300"
      >
        Go To Recovery Center
      </button>
    </div>
  );
}