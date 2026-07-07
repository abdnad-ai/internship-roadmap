"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const initialMessages = [
  { role: "ai", content: "Hey, what are you working on today?" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      { role: "ai", content: "This is a mock response, the real streaming version connects to the AI service." },
    ]);
    setInput("");
  };

  return (
    <main className="px-10 py-8 font-[family-name:var(--font-dash)] max-w-3xl flex flex-col h-[calc(100vh-2rem)]">
      <h1 style={{ color: "var(--dash-text)" }} className="text-2xl font-bold mb-6">
        Chat
      </h1>

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              background: msg.role === "user" ? "var(--dash-accent)" : "var(--dash-surface)",
              border: msg.role === "ai" ? "1px solid rgba(255,255,255,0.06)" : "none",
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              color: msg.role === "user" ? "white" : "var(--dash-text)",
            }}
            className="rounded-lg px-4 py-3 max-w-lg text-sm"
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask anything"
          style={{
            background: "var(--dash-surface)",
            color: "var(--dash-text)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
          className="flex-1 px-4 py-3 rounded-lg text-sm focus:outline-none"
        />
        <button
          onClick={handleSend}
          style={{ background: "var(--dash-accent)" }}
          className="w-11 h-11 rounded-lg flex items-center justify-center text-white hover:opacity-90 transition-opacity"
        >
          <Send size={16} />
        </button>
      </div>
    </main>
  );
} 