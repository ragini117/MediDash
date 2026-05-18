import React, { useState } from "react";
import HealthGuidanceCard from "@/components/ui/HealthGuidanceCard";

export default function Guidance() {
  const [userConcern, setUserConcern] = useState("");
  const [guidance, setGuidance] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGetGuidance = async () => {
    setLoading(true);
    setGuidance(null);

    try {
      const apiUrl = import.meta.env.VITE_GUIDANCE_API || "http://localhost:8000/get-guidance"
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_concern: userConcern }),
      });

      const data = await res.json();
      setGuidance(data.guidance || data);
    } catch (err) {
      console.error("❌ Error fetching guidance:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        🩺 AI Health Guidance
      </h1>

      <textarea
        className="w-full border rounded-md p-3 mb-4"
        rows={4}
        placeholder="Describe your health concern..."
        value={userConcern}
        onChange={(e) => setUserConcern(e.target.value)}
      />

      <button
        onClick={handleGetGuidance}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        {loading ? "Analyzing..." : "Get AI Guidance"}
      </button>

      {guidance && (
        <div className="mt-6">
          <HealthGuidanceCard data={guidance} />
        </div>
      )}
    </div>
  );
}
