 "use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, X } from "lucide-react";

const messages = [
  { name: "Alex M.", color: "#d9a441", text: "Hey! Will be glad to make new acquaintances", time: "2m" },
  { name: "Nikol D.", color: "#3d9e6e", text: "Is someone participating in the lottery? What are the chances?", time: "5m" },
  { name: "Kas S.", color: "#c9457e", text: "Who's going to play roulette?", time: "8m" },
  { name: "Alex M.", color: "#d9a441", text: "I'm going to play in a couple of minutes, want to try a new tactic", time: "11m" },
  { name: "Rin T.", color: "#3d9e9e", text: "Just doubled my balance on Sweet Scatter", time: "14m" },
];

export default function CasinoLiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        style={{ background: "var(--casino-accent)" }}
        className="fixed right-10 top-64 z-50 w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
      >
        {isOpen ? <X size={18} color="white" /> : <MessageCircle size={18} color="white" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ background: "var(--casino-surface)", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
            className="fixed right-0 top-0 h-screen w-72 flex flex-col py-6 z-40 shadow-2xl"
          >
            <div className="flex items-center justify-between px-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span style={{ color: "var(--casino-text)" }} className="text-sm font-bold">
                  Live Chat
                </span>
              </div>
              <span style={{ color: "var(--casino-muted)" }} className="text-xs">
                1,324 online
              </span>
            </div>

            <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      style={{ background: msg.color }}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                    >
                      {msg.name[0]}
                    </div>
                    <span style={{ color: "var(--casino-text)" }} className="text-xs font-semibold">
                      {msg.name}
                    </span>
                    <span style={{ color: "var(--casino-muted)" }} className="text-[10px] ml-auto">
                      {msg.time}
                    </span>
                  </div>
                  <p style={{ color: "var(--casino-muted)" }} className="text-xs leading-relaxed pl-8">
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="px-4 pt-4 mt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type here..."
                  style={{
                    background: "var(--casino-bg)",
                    color: "var(--casino-text)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  className="flex-1 px-3 py-2 rounded-md text-xs focus:outline-none"
                />
                <button
                  style={{ background: "var(--casino-accent)" }}
                  className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                >
                  <Send size={13} color="white" />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
} 