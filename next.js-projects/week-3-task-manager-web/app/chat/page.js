"use client";

import { useState, useRef, useEffect } from "react";
import HeroScene from "../components/HeroScene";
import { apiFetch } from "../lib/api";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hey, what would you like to talk about?" },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    const prompt = input.trim();
    if (!prompt || isStreaming) return;

    setError(null);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: prompt }, { role: "ai", content: "" }]);
    setIsStreaming(true);

    try { 
      const res = await apiFetch("/ai/stream", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok || !res.body) {
        throw new Error("Stream request failed");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "ai",
            content: updated[updated.length - 1].content + chunkText,
          };
          return updated;
        });
      }
    } catch (err) {
      setError("Something went wrong while streaming the response. Please try again.");
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div style={{ fontFamily: "var(--chat-font-body)" }} className="flex flex-col h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 85% 15%, rgba(34,120,90,0.2), transparent 40%), radial-gradient(circle at 15% 85%, rgba(199,56,56,0.15), transparent 40%)",
        }}
      />
      <div className="absolute top-[8%] right-[3%] w-[420px] h-[420px] opacity-35 pointer-events-none">
        <HeroScene />
      </div> 

      <header
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        className="relative z-10 px-8 py-5 flex items-center gap-3"
      >
        <div
          style={{ background: "var(--chat-green)" }}
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
          SkillForge <span style={{ color: "var(--chat-green-bright)" }}>AI</span>
        </h1>
      </header> 

      <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              background: msg.role === "user" ? "var(--chat-green)" : "var(--chat-surface)",
              border: msg.role === "ai" ? "1px solid rgba(255,255,255,0.06)" : "none",
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              color: "var(--chat-text)",
              fontFamily: "var(--chat-font-body)",
            }}
            className="rounded-lg px-5 py-4 max-w-2xl text-base leading-relaxed whitespace-pre-wrap"
          >
            {msg.content || (msg.role === "ai" && isStreaming && i === messages.length - 1 ? (
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
            ) : null)}
          </div>
        ))}
        {error && (
          <div style={{ color: "var(--chat-maroon-bright)" }} className="text-sm px-1">
            {error}
          </div>
        )}
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} className="relative z-10 px-8 py-5">
        <div className="flex items-center gap-2 max-w-3xl mx-auto">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything"
            disabled={isStreaming}
            style={{
              background: "var(--chat-surface)",
              color: "var(--chat-text)",
              border: "1px solid rgba(255,255,255,0.06)",
              fontFamily: "var(--chat-font-body)",
            }}
            className="flex-1 px-4 py-3 rounded-lg text-base focus:outline-none disabled:opacity-60"
          />  
          <button 
            onClick={handleSend}
            disabled={isStreaming}
            style={{ background: "var(--chat-green)", color: "white" }}
            className="px-5 py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isStreaming ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
} 