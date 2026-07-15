"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import AnimatedWaveBg from "../components/AnimatedWaveBg";
import { motion, AnimatePresence } from "framer-motion";

const priorityColors = {
  Low: "#3ddc7a",
  Medium: "#ffc93d",
  High: "#ff4d8d",
};

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
  const textareaRef = useRef(null);

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 200) + "px";
    }
  }, []);

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
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      <AnimatedWaveBg />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
          <span className="text-xs font-medium text-white/80">AI-powered support</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Every question, answered instantly        </h1>
        <p className="text-white/60 text-sm md:text-base mb-10 max-w-md">
          Describe what's going on, and get a response with automatic category and priority tagging in seconds.
        </p>

        <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-2 flex items-center gap-2">
          <textarea
            ref={textareaRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              adjustHeight();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Describe your issue..."
            rows={1}
            className="flex-1 bg-transparent text-white placeholder-white/40 text-sm px-4 py-3 focus:outline-none resize-none overflow-hidden"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-white hover:bg-white/90 transition-colors disabled:opacity-70"
          >
            {loading ? (
              <span
                className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin"
              />
            ) : (
              <span className="text-black text-sm font-semibold">Go</span>
            )}
          </button>
        </div>

        {loading && (
          <motion.p
            key={loadingMessageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-white/50 text-xs mt-3"
          >
            {loadingMessages[loadingMessageIndex]}
          </motion.p>
        )}

        {error && <p className="text-pink-400 text-sm mt-4">{error}</p>}

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key={result.response}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full mt-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-left"
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  style={{ background: "rgba(255,255,255,0.12)" }}
                  className="text-xs font-semibold px-2.5 py-1 rounded-full text-white"
                >
                  {result.category}
                </span>
                <span
                  style={{ background: priorityColors[result.priority] || "#666" }}
                  className="text-xs font-semibold px-2.5 py-1 rounded-full text-black"
                >
                  {result.priority} priority
                </span>
              </div>
              <p className="text-white/90 text-base leading-relaxed whitespace-pre-wrap">
                {result.response}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 