"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const sessions = [
  { id: "1", title: "Product roadmap draft", time: "2 min ago", messages: 14 },
  { id: "2", title: "Debugging auth flow", time: "18 min ago", messages: 32 },
  { id: "3", title: "Marketing copy review", time: "1 hour ago", messages: 8 },
  { id: "4", title: "Data pipeline questions", time: "3 hours ago", messages: 21 },
  { id: "5", title: "Weekly report summary", time: "Yesterday", messages: 6 },
  { id: "6", title: "Client onboarding checklist", time: "Yesterday", messages: 11 },
  { id: "7", title: "Sprint retro notes", time: "2 days ago", messages: 19 },
  { id: "8", title: "API error triage", time: "3 days ago", messages: 27 },
];

export default function SessionsPage() {
  return (
    <main className="px-10 py-8 font-[family-name:var(--font-dash)]">
      <h1 style={{ color: "var(--dash-text)" }} className="text-2xl font-bold mb-8">
        Sessions
      </h1>
      <div className="flex flex-col gap-2">
        {sessions.map((session, i) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
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