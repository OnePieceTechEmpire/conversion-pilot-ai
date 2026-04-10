"use client";

import { useState } from "react";
import { RiskFormData, RiskPredictionResult } from "@/types/risk";


type RiskFormProps = {
  onPrediction: (result: RiskPredictionResult) => void;
};

const initialForm: RiskFormData = {
  page_view: 3,
  num_events: 4,
  num_unique_products: 2,
  session_duration_min: 6,
  device: "mobile",
  source: "direct",
  session_country: "US",
  age: 24,
  days_since_signup: 12,
  marketing_opt_in: 0,
  session_hour: 23,
  session_dayofweek: 5,
};

export default function RiskForm({ onPrediction }: RiskFormProps) {
  const [form, setForm] = useState<RiskFormData>(initialForm);
  const [loading, setLoading] = useState(false);

  function updateField<K extends keyof RiskFormData>(key: K, value: RiskFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error("Prediction request failed");
    }

const result = await response.json();

localStorage.setItem(
  "latestPrediction",
  JSON.stringify(result)
);

onPrediction(result);
  } catch (error) {
    console.error(error);
    alert("Failed to get prediction from API.");
  } finally {
    setLoading(false);
  }
}

  function loadPreset(type: "high" | "medium" | "low") {
    if (type === "high") {
      setForm({
        page_view: 2,
        num_events: 3,
        num_unique_products: 1,
        session_duration_min: 4,
        device: "mobile",
        source: "direct",
        session_country: "US",
        age: 22,
        days_since_signup: 8,
        marketing_opt_in: 0,
        session_hour: 23,
        session_dayofweek: 6,
      });
    } else if (type === "medium") {
      setForm({
        page_view: 5,
        num_events: 6,
        num_unique_products: 3,
        session_duration_min: 10,
        device: "tablet",
        source: "organic",
        session_country: "UK",
        age: 31,
        days_since_signup: 60,
        marketing_opt_in: 1,
        session_hour: 20,
        session_dayofweek: 3,
      });
    } else {
      setForm({
        page_view: 9,
        num_events: 12,
        num_unique_products: 5,
        session_duration_min: 22,
        device: "desktop",
        source: "email",
        session_country: "IN",
        age: 45,
        days_since_signup: 420,
        marketing_opt_in: 1,
        session_hour: 14,
        session_dayofweek: 2,
      });
    }
  }

  return (
    <div className="rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-lg font-semibold">Session Input</h3>
          <p className="text-sm text-slate-500 mt-1">
            Enter session behavior and customer context to predict cart abandonment risk.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => loadPreset("high")}
            className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
          >
            High Risk Preset
          </button>
          <button
            type="button"
            onClick={() => loadPreset("medium")}
            className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
          >
            Medium Risk Preset
          </button>
          <button
            type="button"
            onClick={() => loadPreset("low")}
            className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
          >
            Low Risk Preset
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputNumber label="Page Views" value={form.page_view} onChange={(v) => updateField("page_view", v)} />
        <InputNumber label="Number of Events" value={form.num_events} onChange={(v) => updateField("num_events", v)} />
        <InputNumber label="Unique Products Viewed" value={form.num_unique_products} onChange={(v) => updateField("num_unique_products", v)} />
        <InputNumber label="Session Duration (min)" value={form.session_duration_min} onChange={(v) => updateField("session_duration_min", v)} />

        <SelectField
          label="Device"
          value={form.device}
          onChange={(v) => updateField("device", v as RiskFormData["device"])}
          options={["mobile", "desktop", "tablet"]}
        />

        <SelectField
          label="Source"
          value={form.source}
          onChange={(v) => updateField("source", v as RiskFormData["source"])}
          options={["organic", "direct", "email"]}
        />

        <InputText label="Session Country" value={form.session_country} onChange={(v) => updateField("session_country", v.toUpperCase())} />
        <InputNumber label="Age" value={form.age} onChange={(v) => updateField("age", v)} />
        <InputNumber label="Days Since Signup" value={form.days_since_signup} onChange={(v) => updateField("days_since_signup", v)} />

        <SelectField
          label="Marketing Opt-In"
          value={String(form.marketing_opt_in)}
          onChange={(v) => updateField("marketing_opt_in", Number(v) as 0 | 1)}
          options={["0", "1"]}
          optionLabels={{ "0": "No", "1": "Yes" }}
        />

        <InputNumber label="Session Hour" value={form.session_hour} onChange={(v) => updateField("session_hour", v)} />
        <InputNumber label="Session Day of Week" value={form.session_dayofweek} onChange={(v) => updateField("session_dayofweek", v)} />

        <div className="md:col-span-2 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-xl py-3 font-medium hover:scale-[1.02] transition-all duration-300"
          >
            {loading ? "Predicting..." : "Predict Abandonment Risk"}
          </button>
        </div>
      </form>
    </div>
  );
}

function InputNumber({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
      />
    </label>
  );
}

function InputText({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  optionLabels,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  optionLabels?: Record<string, string>;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {optionLabels?.[option] ?? option}
          </option>
        ))}
      </select>
    </label>
  );
}