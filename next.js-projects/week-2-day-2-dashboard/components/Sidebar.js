"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Command Center", href: "/", marker: "01" },
  { label: "Skill Map", href: "/skills", marker: "02" },
  { label: "Mission Board", href: "/missions", marker: "03" },
  { label: "Talent Pods", href: "/pods", marker: "04" },
  { label: "Reflection Vault", href: "/vault", marker: "05" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-6 h-fit rounded-[2rem] border border-[#3a2d4f] bg-[#1d172a]/90 p-5 shadow-2xl shadow-black/30">
      <div className="rounded-[1.5rem] bg-[#120f1a] p-5">
        <p className="text-xs uppercase tracking-[0.4em] text-[#d7a84f]">
          SkillForge
        </p>
        <h1 className="mt-3 text-2xl font-black leading-tight text-[#f6efe7]">
          Studio
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#b8afc7]">
          A mission dashboard for learning signals, skill growth, and intern project matching.
        </p>
      </div>

      <nav className="mt-6 space-y-3">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center justify-between rounded-2xl border px-4 py-3 transition ${
                active
                  ? "border-[#d7a84f] bg-[#d7a84f] text-[#120f1a]"
                  : "border-[#3a2d4f] bg-[#2a2038]/60 text-[#f6efe7] hover:border-[#e56b8c]"
              }`}
            >
              <span className="font-semibold">{item.label}</span>
              <span
                className={`text-xs ${
                  active ? "text-[#120f1a]" : "text-[#b8afc7]"
                }`}
              >
                {item.marker}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
} 