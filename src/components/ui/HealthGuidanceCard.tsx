"use client";

import React from "react";
import { useTheme } from "next-themes";

interface HealthGuidanceProps {
  data: Record<string, any>;
}

const HealthGuidanceCard: React.FC<HealthGuidanceProps> = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`rounded-2xl p-6 shadow-md transition-all border ${
        isDark
          ? "bg-[#1E1E1E] border-gray-700 text-gray-100"
          : "bg-white border-gray-200 text-gray-800"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        🧠 Gemini AI Health Guidance
      </h2>

      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="border-b pb-3">
            <h3
              className={`text-lg font-medium mb-2 capitalize ${
                isDark ? "text-blue-300" : "text-blue-700"
              }`}
            >
              {key.replaceAll("_", " ")}
            </h3>

            {Array.isArray(value) ? (
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {value.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-relaxed">{String(value)}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthGuidanceCard;
