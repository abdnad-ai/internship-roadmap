"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, Timer, Sparkles, TrendingUp } from "lucide-react";
import CountUp from "@/components/CountUp";

const stats = [
  { label: "Active sessions", value: 1284, suffix: "", decimals: 0, icon: Activity, color: "#b8443c" },
  { label: "Avg response time", value: 0.8, suffix: "s", decimals: 1, icon: Timer, color: "#c98a3c" },
  { label: "Prompts today", value: 6340, suffix: "", decimals: 0, icon: Sparkles, color: "#3ca582" },
  { label: "Success rate", value: 99.2, suffix: "%", decimals: 1, icon: TrendingUp, color: "#5b8fc9" },
];

const sessions = [
  { id: "1", title: "Product roadmap draft", time: "2 min ago", messages: 14 },
  { id: "2", title: "Debugging auth flow", time: "18 min ago", messages: 32 },
  { id: "3", title: "Marketing copy review", time: "1 hour ago", messages: 8 },
  { id: "4", title: "Data pipeline questions", time: "3 hours ago", messages: 21 },
  { id: "5", title: "Weekly report summary", time: "Yesterday", messages: 6 },
];

export default function DashboardPage() {
  return (
    <main className="px-10 py-8 font-[family-name:var(--font-dash)]">
      <div className="flex items-center justify-between mb-8">
        <h1 style={{ color: "var(--dash-text)" }} className="text-2xl font-bold">
          Overview
        </h1>
        <Link
          href="/dashboard/chat"
          style={{ background: "var(--dash-accent)", color: "white" }}
          className="px-5 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Start a session
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
             <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4, borderColor: stat.color }}
              style={{ background: "var(--dash-surface)", border: "1px solid rgba(255,255,255,0.06)" }}
              className="relative rounded-lg p-5 overflow-hidden cursor-pointer transition-shadow hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]"
            > 
              <div
                style={{ background: stat.color, opacity: 0.15 }}
                className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl"
              />
              <div
                style={{ background: `${stat.color}22`, color: stat.color }}
                className="w-9 h-9 rounded-md flex items-center justify-center mb-3 relative z-10"
              >
                <Icon size={16} strokeWidth={2} />
              </div>
              <p style={{ color: "var(--dash-text)" }} className="text-2xl font-bold relative z-10">
                <CountUp target={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              </p>
              <p style={{ color: "var(--dash-muted)" }} className="text-xs mt-2 relative z-10">
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 style={{ color: "var(--dash-text)" }} className="text-lg font-bold">
          Recent sessions
        </h2>
        <Link href="/dashboard/sessions" style={{ color: "var(--dash-accent)" }} className="text-sm font-medium">
          View all
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {sessions.map((session, i) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.3 + i * 0.06 }}
          >
            <Link
              href={`/dashboard/sessions/${session.id}`}
              style={{ background: "var(--dash-surface)", border: "1px solid rgba(255,255,255,0.06)" }}
              className="rounded-lg px-5 py-4 flex items-center justify-between hover:border-[var(--dash-accent)]/40 transition-colors"
            >
              <div>
                <p style={{ color: "var(--dash-text)" }} className="text-sm font-medium">
                  {session.title}
                </p>
                <p style={{ color: "var(--dash-muted)" }} className="text-xs mt-1">
                  {session.time}
                </p>
              </div>
              <span style={{ color: "var(--dash-muted)" }} className="text-xs">
                {session.messages} messages
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
} 