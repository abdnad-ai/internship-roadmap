"use client";

import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { day: "Mon", players: 8200 },
  { day: "Tue", players: 8900 },
  { day: "Wed", players: 9400 },
  { day: "Thu", players: 9100 },
  { day: "Fri", players: 10800 },
  { day: "Sat", players: 12300 },
  { day: "Sun", players: 11443 },
];

export default function CasinoActivityChart() {
  return (
    <div style={{ background: "var(--casino-surface)", border: "1px solid rgba(255,255,255,0.08)" }} className="rounded-lg p-5">
      <h3 style={{ color: "var(--casino-text)" }} className="text-sm font-bold mb-3">
        Weekly activity
      </h3>
      <div style={{ height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: 5 }}>
            <defs>
              <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--casino-accent)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--casino-accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" stroke="var(--casino-muted)" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ background: "var(--casino-bg)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
              labelStyle={{ color: "var(--casino-text)" }}
              itemStyle={{ color: "var(--casino-accent)" }}
            />
            <Area type="monotone" dataKey="players" stroke="var(--casino-accent)" strokeWidth={2} fill="url(#activityFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 