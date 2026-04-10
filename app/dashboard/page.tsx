"use client";

import { useState } from "react";
import Image from "next/image";
import StatCard from "@/components/StatCard";

export default function DashboardPage() {
  const images = [
    "/11.jpeg",
    "/22.jpeg",
    "/333.jpeg",
    "/55.jpeg",
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">
          Behavior Intelligence Dashboard
        </h2>
        <p className="mt-2 text-slate-600">
          Overview of store performance, traffic behavior, and conversion bottlenecks.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value="$111.65M" helper="Strong market performance" />
        <StatCard label="Total Sessions" value="120K" helper="High platform activity" />
        <StatCard label="Conversion Rate" value="27.98%" helper="Room for improvement" />
        <StatCard label="Avg Order Value" value="$357.61" helper="Strong purchasing power" />
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* IMAGE SLIDER SECTION */}
        <div className="lg:col-span-2 rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold mb-4">
            Analytics Dashboard Snapshot
          </h3>

          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            <Image
              src={images[current]}
              alt="Dashboard preview"
              width={1600}
              height={900}
              className="w-full h-auto"
            />

            {/* Prev Button */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-1 rounded-full shadow hover:bg-white"
            >
              ←
            </button>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-1 rounded-full shadow hover:bg-white"
            >
              →
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 rounded-full ${
                    i === current ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* AI INSIGHTS */}
        <div className="rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
          <h3 className="text-lg font-semibold">AI Insights</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li>• Major drop-off occurs between add-to-cart and checkout.</li>
            <li>• Mobile and direct traffic appear more vulnerable to abandonment.</li>
            <li>• Peak user activity occurs around midnight, suggesting strong timing opportunities.</li>
            <li>• Beauty and Fashion are strong categories for conversion recovery strategies.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}