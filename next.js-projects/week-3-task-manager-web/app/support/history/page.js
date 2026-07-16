"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "../../lib/api";
import AnimatedWaveBg from "../../components/AnimatedWaveBg";

const priorityColors = {
  Low: "#3ddc7a",
  Medium: "#ffc93d",
  High: "#ff4d8d",
};

export default function SupportHistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await apiFetch("/ai/support/history");
        if (!res.ok) throw new Error("Failed to load history");
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        setError("Could not load your conversation history.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="relative min-h-screen px-6 py-16 overflow-hidden">
      <AnimatedWaveBg />

      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Your conversation history</h1>
        <p className="text-white/50 text-sm mb-8">
          Every question you've asked the support agent, most recent first.
        </p>

        {loading && <p className="text-white/50 text-sm">Loading...</p>}
        {error && <p className="text-pink-400 text-sm">{error}</p>}

        {!loading && !error && history.length === 0 && (
          <p className="text-white/50 text-sm">
            No conversations yet. Ask something on the support page to get started.
          </p>
        )}

        <div className="flex flex-col gap-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white">
                  {item.category}
                </span>
                <span
                  style={{ background: priorityColors[item.priority] || "#666" }}
                  className="text-xs font-semibold px-2.5 py-1 rounded-full text-black"
                >
                  {item.priority} priority
                </span>
                <span className="text-white/40 text-xs ml-auto">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-white/70 text-sm font-medium mb-2">{item.query}</p>
              <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
                {item.response}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 