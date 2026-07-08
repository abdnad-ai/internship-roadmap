import Image from "next/image";
import CasinoPageHero from "@/components/CasinoPageHero";

const ICON_BASE = "https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/128";

const bonuses = [
  { title: "Welcome bonus", desc: "160% match on your first deposit, up to $500", icon: "Money-Bag", color: "#1e8449" },
  { title: "Weekly reload", desc: "20% back on your Friday deposit", icon: "Wrapped-Gift", color: "#0d47a1" },
  { title: "Referral bonus", desc: "Earn $10 for every friend who signs up", icon: "Coin", color: "#c99a33" },
];

export default function BonusPage() {
  return (
    <main className="relative px-10 py-10">
      <CasinoPageHero
        title="Bonus"
        subtitle="Extra value on top of every deposit."
        icon="Wrapped-Gift"
        from="#0d47a1"
        to="#1565c0"
      />
      <h2 style={{ color: "var(--casino-text)" }} className="text-base font-bold mb-4">
        Available bonuses
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {bonuses.map((bonus) => (
          <div
            key={bonus.title}
            style={{ background: "var(--casino-surface)", border: `1px solid ${bonus.color}40` }}
            className="rounded-lg p-5"
          >
            <Image src={`${ICON_BASE}/${bonus.icon}-3d-icon.png`} alt="" width={40} height={40} unoptimized />
            <p style={{ color: "var(--casino-text)" }} className="text-base font-bold mt-3">
              {bonus.title}
            </p>
            <p style={{ color: "var(--casino-muted)" }} className="text-xs mt-1">
              {bonus.desc}
            </p>
          </div>
        ))}
      </div>
    </main> 
  );
} 