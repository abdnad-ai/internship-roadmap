"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ICON_BASE = "https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/128";

const stats = [
  { label: "Active players", value: "11,443", icon: "Busts-In-Silhouette", color: "#3d9e6e" },
  { label: "Wagered today", value: "$3,433.0K", icon: "Money-Bag", color: "#d9a441" },
  { label: "Biggest win this week", value: "$8,763.78", icon: "Trophy", color: "#c9457e" },
];

export default function CasinoStatsRow() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          style={{ background: "var(--casino-surface)", border: "1px solid rgba(255,255,255,0.08)" }}
          className="rounded-lg p-4 flex items-center gap-3"
        >
          <div
            style={{ background: `${stat.color}22` }}
            className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0"
          >
            <Image src={`${ICON_BASE}/${stat.icon}-3d-icon.png`} alt="" width={22} height={22} unoptimized />
          </div>
          <div className="min-w-0">
            <p style={{ color: "var(--casino-text)" }} className="text-lg font-black truncate">
              {stat.value}
            </p>
            <p style={{ color: "var(--casino-muted)" }} className="text-[11px] truncate">
              {stat.label}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 