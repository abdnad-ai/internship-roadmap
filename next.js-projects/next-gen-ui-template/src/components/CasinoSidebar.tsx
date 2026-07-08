 "use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const ICON_BASE = "https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/128";

const casinoItems = [
  { label: "Lobby", icon: "Joystick", href: "/casino", count: null },
  { label: "Crush", icon: "Rocket", href: "/casino/crush", count: 28 },
  { label: "Towers", icon: "Bar-Chart", href: "/casino/towers", count: 60 },
  { label: "Roulette", icon: "Slot-Machine", href: "/casino/roulette", count: null },
  { label: "Plinko", icon: "Game-Die", href: "/casino/plinko", count: 10 },
  { label: "Mines", icon: "Bomb", href: "/casino/mines", count: 12 },
  { label: "Dice", icon: "Game-Die", href: "/casino/dice", count: 20 },
];

const otherItems = [
  { label: "VIP Club", icon: "Crown", href: "/casino/vip" },
  { label: "Bonus", icon: "Wrapped-Gift", href: "/casino/bonus" },
  { label: "Promotions", icon: "Trophy", href: "/casino/promotions" },
  { label: "Leaderboard", icon: "Bar-Chart", href: "/casino/leaderboard" },
  { label: "Affiliate", icon: "Handshake", href: "/casino/affiliate" },
  { label: "Support", icon: "Headphone", href: "/casino/support" },
];

export default function CasinoSidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{ background: "var(--casino-surface)", borderRight: "1px solid rgba(255,255,255,0.08)" }}
      className="w-64 h-screen fixed left-0 top-0 flex flex-col py-8 px-3 overflow-y-auto"
    >
      <div className="flex items-center gap-2.5 px-3 mb-2">
        <div
          style={{ background: "linear-gradient(135deg, var(--casino-accent) 0%, #ff8ab5 100%)" }}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white"
        >
          L
        </div>
        <span style={{ color: "var(--casino-text)" }} className="font-black tracking-wide text-base">
          LUXE
        </span>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} className="my-5" />

      <p style={{ color: "var(--casino-muted)" }} className="px-3 text-[11px] font-bold uppercase tracking-wide mb-2">
        Casino
      </p>
      <nav className="flex flex-col gap-0.5 mb-6">
        {casinoItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: active ? "var(--casino-text)" : "var(--casino-muted)",
                background: active ? "rgba(255,77,141,0.12)" : "transparent",
                borderLeft: active ? "2px solid var(--casino-accent)" : "2px solid transparent",
              }}
              className="flex items-center justify-between gap-3 px-3 py-2 text-sm font-semibold hover:bg-white/5 transition-colors"
            >
              <span className="flex items-center gap-3">
                <Image
                  src={`${ICON_BASE}/${item.icon}-3d-icon.png`}
                  alt=""
                  width={17}
                  height={17}
                  unoptimized
                  style={{ opacity: active ? 1 : 0.75 }}
                />
                {item.label}
              </span>
              {item.count !== null && (
                <span style={{ color: "var(--casino-muted)" }} className="text-xs">
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <p style={{ color: "var(--casino-muted)" }} className="px-3 text-[11px] font-bold uppercase tracking-wide mb-2">
        Other
      </p>
      <nav className="flex flex-col gap-0.5">
        {otherItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: active ? "var(--casino-text)" : "var(--casino-muted)",
                background: active ? "rgba(255,77,141,0.12)" : "transparent",
                borderLeft: active ? "2px solid var(--casino-accent)" : "2px solid transparent",
              }}
              className="flex items-center gap-3 px-3 py-2 text-sm font-semibold hover:bg-white/5 transition-colors"
            >
              <Image
                src={`${ICON_BASE}/${item.icon}-3d-icon.png`}
                alt=""
                width={17}
                height={17}
                unoptimized
                style={{ opacity: active ? 1 : 0.75 }}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
} 