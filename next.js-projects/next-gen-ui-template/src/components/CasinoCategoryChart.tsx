"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Slots", value: 38, color: "#d9a441" },
  { name: "Live Casino", value: 24, color: "#c9457e" },
  { name: "Table Games", value: 18, color: "#3d9e6e" },
  { name: "Crash", value: 12, color: "#3d9e9e" },
  { name: "Other", value: 8, color: "#8a5fc9" },
];

export default function CasinoCategoryChart() {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div style={{ background: "var(--casino-surface)", border: "1px solid rgba(255,255,255,0.08)" }} className="rounded-lg p-5">
      <h3 style={{ color: "var(--casino-text)" }} className="text-sm font-bold mb-3">
        Top game categories
      </h3>
      <div className="relative flex items-center justify-center" style={{ height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={55} outerRadius={80} paddingAngle={2} stroke="none">
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute flex flex-col items-center">
          <span style={{ color: "var(--casino-text)" }} className="text-lg font-black">
            {total}%
          </span>
          <span style={{ color: "var(--casino-muted)" }} className="text-[10px]">
            of plays
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 mt-3">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div style={{ background: entry.color }} className="w-2 h-2 rounded-full flex-shrink-0" />
            <span style={{ color: "var(--casino-muted)" }} className="text-xs flex-1">
              {entry.name}
            </span>
            <span style={{ color: "var(--casino-text)" }} className="text-xs font-semibold">
              {entry.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 