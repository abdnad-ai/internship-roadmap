 "use client";

import { useState } from "react";
import Image from "next/image";
import { Settings, Bell } from "lucide-react";

const ICON_BASE = "https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/128";

export default function CasinoTopBar({
  onSearchChange,
  activeTab,
  onTabChange,
}: {
  onSearchChange?: (value: string) => void;
  activeTab?: "casino" | "sport";
  onTabChange?: (tab: "casino" | "sport") => void;
} = {}) {
  const [internalTab, setInternalTab] = useState<"casino" | "sport">("casino");
  const tab = activeTab ?? internalTab;

  const setTab = (next: "casino" | "sport") => {
    setInternalTab(next);
    onTabChange?.(next);
  };

  return (
    <header className="flex items-center justify-between mb-8 gap-6">
      <div
        style={{ background: "var(--casino-surface)", border: "1px solid rgba(255,255,255,0.08)" }}
        className="flex items-center rounded-lg p-1"
      >
        <button
          onClick={() => setTab("casino")}
          style={{
            background: tab === "casino" ? "var(--casino-accent)" : "transparent",
            color: tab === "casino" ? "white" : "var(--casino-muted)",
          }}
          className="px-4 py-2 rounded-md text-sm font-bold transition-colors"
        >
          Casino
        </button>
        <button
          onClick={() => setTab("sport")}
          style={{
            background: tab === "sport" ? "var(--casino-accent)" : "transparent",
            color: tab === "sport" ? "white" : "var(--casino-muted)",
          }}
          className="px-4 py-2 rounded-md text-sm font-bold transition-colors"
        >
          Sport
        </button>
      </div>

      <input
        placeholder="Search for a game"
        onChange={(e) => onSearchChange?.(e.target.value)}
        style={{
          background: "var(--casino-surface)",
          color: "var(--casino-text)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        className="px-4 py-2.5 rounded-lg text-sm flex-1 max-w-md focus:outline-none"
      />

      <div className="flex items-center gap-3">
        <div
          style={{ background: "var(--casino-surface)", border: "1px solid rgba(255,255,255,0.1)" }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
        >
          <Image src={`${ICON_BASE}/Coin-3d-icon.png`} alt="" width={18} height={18} unoptimized />
          <span style={{ color: "var(--casino-text)" }} className="text-sm font-semibold">
            7,450
          </span>
        </div>
        <button
          style={{ background: "var(--casino-accent)", color: "white" }}
          className="px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
        >
          Deposit
        </button>
        <button
          style={{ background: "var(--casino-surface)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--casino-muted)" }}
          className="w-9 h-9 rounded-lg flex items-center justify-center hover:text-white transition-colors"
        >
          <Bell size={16} />
        </button>
        <button
          style={{ background: "var(--casino-surface)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--casino-muted)" }}
          className="w-9 h-9 rounded-lg flex items-center justify-center hover:text-white transition-colors"
        >
          <Settings size={16} />
        </button>
        <div
          style={{ background: "var(--casino-accent)" }}
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
        >
          CA
        </div>
      </div>
    </header>
  );
} 