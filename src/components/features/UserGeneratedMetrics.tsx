"use client";

import { COLORS } from "@/constants/colors";

const APP_GRADIENT = `linear-gradient(135deg, ${COLORS.GRADIENT_START} 0%, ${COLORS.GRADIENT_END} 100%)`;

const BAR_DATA = [
  { month: "JAN", value: 40 },
  { month: "FEB", value: 55 },
  { month: "MAR", value: 45 },
  { month: "APR", value: 85 },
  { month: "MAY", value: 60 },
  { month: "JUN", value: 50 },
];

export function UserGeneratedMetrics() {
  const maxVal = Math.max(...BAR_DATA.map((d) => d.value));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <p className="text-sm font-medium text-gray-500">Overall Users</p>
        <div className="flex items-end justify-between gap-4 mt-2">
          <div>
            <p className="text-2xl font-bold text-gray-900">8.06%</p>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-gray-400" aria-hidden />
              1.2%
            </p>
          </div>
          <div className="flex items-end gap-1.5 h-16">
            {BAR_DATA.map((d) => (
              <div key={d.month} className="w-6 h-full flex flex-col justify-end items-center gap-0.5">
                <div
                  className="w-full rounded-t bg-red-500 flex-shrink-0"
                  style={{ height: `${(d.value / maxVal) * 100}%`, minHeight: "6px" }}
                />
                <span className="text-[10px] text-gray-500">{d.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <p className="text-sm font-medium text-gray-500">Total Post</p>
        <p className="text-2xl font-bold text-gray-900 mt-2">250</p>
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-gray-400" aria-hidden />
          1.2%
        </p>
      </div>

      <div
        className="rounded-2xl border border-transparent p-6 shadow-sm text-white"
        style={{ background: APP_GRADIENT }}
      >
        <p className="text-sm font-medium text-white/90">Live Posts</p>
        <p className="text-2xl font-bold mt-2">150</p>
        <p className="text-xs text-white/80 mt-1 flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-white/60" aria-hidden />
          1.2%
        </p>
      </div>
    </div>
  );
}
