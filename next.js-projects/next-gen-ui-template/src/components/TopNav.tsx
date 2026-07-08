"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Overview", href: "/dashboard" },
  { label: "Chat", href: "/dashboard/chat" },
  { label: "Sessions", href: "/dashboard/sessions" },
  { label: "History", href: "/dashboard/history" },
  { label: "Settings", href: "/dashboard/settings" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header
      style={{ background: "var(--dash-surface)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      className="sticky top-0 z-50 flex items-center justify-between px-10 py-4 font-[family-name:var(--font-dash)]"
    >
      <div className="flex items-center gap-2.5">
        <div
          style={{ background: "var(--dash-accent)" }}
          className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold text-white"
        >
          N
        </div>
        <span style={{ color: "var(--dash-text)" }} className="font-bold tracking-wide text-base">
          NEXTGEN
        </span>
      </div>

      <nav className="flex items-center gap-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: active ? "var(--dash-text)" : "var(--dash-muted)",
                background: active ? "var(--dash-accent)" : "transparent",
              }}
              className="px-4 py-2 rounded-md text-sm font-medium hover:bg-white/5 transition-colors"
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div
        style={{ background: "var(--dash-accent)" }}
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
      >
        CA
      </div>
    </header>
  );
} 