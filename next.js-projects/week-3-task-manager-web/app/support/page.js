"use client";

import { useState, useEffect, useRef } from "react";
import HeroScene from "../components/HeroScene";

const loadingMessages = [
  "Reading your message...",
  "Gathering information...",
  "Identifying the category...",
  "Assessing priority...",
  "Putting together a response...",
];

export default function SupportPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
 const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const intervalRef = useRef(null);

  const handleSubmit = async () => {
    if (!query.trim() || loading) return;

    setLoading(true);
    setError(null); 
    setResult(null);
    setLoadingMessageIndex(0);

    intervalRef.current = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2500);

    try {
      const res = await fetch("http://localhost:3001/ai/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError("Something went wrong while getting a response. Please try again.");
    } finally {
      clearInterval(intervalRef.current);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute top-[10%] right-[3%] w-[420px] h-[420px] opacity-25 pointer-events-none">
        <HeroScene />
      </div>

      <header
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        className="relative z-10 px-8 py-5 flex items-center gap-3"
      >
        <div
          style={{ background: "var(--chat-maroon)" }}
          className="w-8 h-8 rounded-md flex items-center justify-center"
        >
          <span style={{ color: "var(--chat-text)", fontFamily: "var(--chat-font-display)" }} className="text-sm font-bold">
            S
          </span>
        </div>
        <h1
          style={{ fontFamily: "var(--chat-font-display)", color: "var(--chat-text)" }}
          className="text-2xl font-bold tracking-tight"
        >
          Support <span style={{ color: "var(--chat-maroon-bright)" }}>Agent</span>
        </h1>
      </header>

      <main className="relative z-10 max-w-2xl mx-auto px-8 py-10">
        <p style={{ color: "var(--chat-muted)", fontFamily: "var(--chat-font-body)" }} className="text-sm mb-6">
          Describe your issue and get an instant response, with automatic category and priority tagging.
        </p>

        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your issue..."
          rows={4}
          style={{
            background: "var(--chat-surface)",
            color: "var(--chat-text)",
            border: "1px solid rgba(255,255,255,0.06)",
            fontFamily: "var(--chat-font-body)",
          }}
          className="w-full px-4 py-3 rounded-lg text-base focus:outline-none resize-none"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ background: "var(--chat-green)", color: "white", fontFamily: "var(--chat-font-body)" }}
          className="mt-4 px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Getting response..." : "Submit"}
        </button>

        {error && (
          <p style={{ color: "var(--chat-maroon-bright)", fontFamily: "var(--chat-font-body)" }} className="text-sm mt-4">
            {error}
          </p>
        )}

        {result && (
          <div
            style={{
              background: "var(--chat-surface)",
              border: "1px solid rgba(255,255,255,0.06)",
              fontFamily: "var(--chat-font-body)",
            }}
            className="mt-8 rounded-lg p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <span
                style={{ background: "var(--chat-green)", color: "white" }}
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
              >
                {result.category}
              </span>
              <span
                style={{ background: priorityColors[result.priority] || "var(--chat-muted)", color: "white" }}
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
              >
                {result.priority} priority
              </span>
            </div>
            <p style={{ color: "var(--chat-text)" }} className="text-base leading-relaxed whitespace-pre-wrap">
              {result.response}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}  