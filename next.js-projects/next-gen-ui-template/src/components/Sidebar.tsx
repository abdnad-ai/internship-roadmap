"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { LayoutGrid, MessageSquare, ListTree, History, Settings } from "lucide-react";

const navItems = [
  { label: "Overview", icon: LayoutGrid, href: "/dashboard" },
  { label: "Chat", icon: MessageSquare, href: "/dashboard/chat" },
  { label: "Sessions", icon: ListTree, href: "/dashboard/sessions" },
  { label: "History", icon: History, href: "/dashboard/history" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{ background: "var(--dash-surface)", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      className="w-64 h-screen fixed left-0 top-0 flex flex-col py-6 px-4 font-[family-name:var(--font-dash)]"
    >
      <div className="flex items-center gap-2.5 px-2 mb-10">
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

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{
                  color: active ? "var(--dash-text)" : "var(--dash-muted)",
                  background: active ? "var(--dash-accent)" : "transparent",
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors"
              >
                <Icon size={17} strokeWidth={2} />
                {item.label}
              </motion.div>
            </Link>
          ); 
        })}
      </nav>

    
    </aside>
  );
} 