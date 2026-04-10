"use client";

import { useEffect, useState } from "react";

export default function RecoveryCenterPage() {
  const [prediction, setPrediction] = useState<any>(null);

  const [productsByCategory, setProductsByCategory] = useState<any>({});
  const [recommendations, setRecommendations] = useState<any>({});

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("latestPrediction");

    if (stored) {
      setPrediction(JSON.parse(stored));
    }

    fetch("/data/products_by_category.json")
      .then((res) => res.json())
      .then((data) => setProductsByCategory(data));

    fetch("/data/demo_recommendations.json")
      .then((res) => res.json())
      .then((data) => setRecommendations(data));
  }, []);

  const availableProducts =
    selectedCategory && productsByCategory[selectedCategory]
      ? productsByCategory[selectedCategory]
      : [];

const selectedRecommendations =
  selectedProduct && recommendations[String(selectedProduct)]
      ? recommendations[selectedProduct]
      : [];

  return (
    <div className="space-y-6">
<div className="mb-8">
  <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
    Recovery Center
  </h2>

  <p className="text-slate-500 mt-2 text-lg">
    AI-powered recovery strategies for at-risk shopping sessions.
  </p>
</div>

      {prediction && (
        <div className="rounded-2xl bg-white p-6 shadow-sm border">
          <h3 className="text-xl font-semibold">Latest Prediction Summary</h3>

          <p className="mt-4">
            Risk Level:
            <span className="font-bold ml-2">{prediction.risk_level}</span>
          </p>

          <p>
            Abandonment Probability:
            <span className="font-bold ml-2">
              {Math.round(prediction.abandonment_probability * 100)}%
            </span>
          </p>
        </div>
      )}

      <div className="rounded-2xl bg-white p-6 shadow-sm border">
        <h3 className="text-xl font-semibold">Suggested Recovery Strategy</h3>

        <ul className="mt-4 space-y-2">
          <li>• Offer limited-time discount coupon</li>
          <li>• Highlight urgency / low stock badge</li>
          <li>• Show social proof / reviews</li>
          <li>• Suggest bundled purchase</li>
        </ul>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm border">
        <h3 className="text-xl font-semibold mb-4">Next Best Products</h3>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <select
            className="border rounded-xl p-3"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedProduct("");
            }}
          >
            <option value="">Select Category</option>

            {Object.keys(productsByCategory).map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>

          <select
            className="border rounded-xl p-3"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">Select Product</option>

{availableProducts
  .filter((product: any) => recommendations[String(product.product_id)])
  .map((product: any) => (
    <option key={product.product_id} value={product.product_id}>
      {product.name}
    </option>
  ))}
          </select>
        </div>

        <p className="text-sm text-slate-500">
  Selected Product ID: {selectedProduct || "none"}
</p>

<p className="text-sm text-slate-500">
  Recommendation Found: {selectedProduct && recommendations[String(selectedProduct)] ? "Yes" : "No"}
</p>

        <div className="grid md:grid-cols-3 gap-4">
          {selectedRecommendations.map((product: any, i: number) => (
<div
  key={i}
  className="border rounded-2xl p-5 bg-gradient-to-br from-white to-slate-50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
>
  <h4 className="font-semibold text-lg">{product.name}</h4>

  <p className="text-sm text-slate-500 mt-1">
    {product.category}
  </p>

  <p className="text-sm mt-3 font-medium text-indigo-600">
    Carted Together Score: {product.times_carted_together}
  </p>
</div>
          ))}
        </div>
      </div>
    </div>
  );
}