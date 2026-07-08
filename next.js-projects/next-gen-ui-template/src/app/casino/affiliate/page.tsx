import CasinoPageHero from "@/components/CasinoPageHero";

const stats = [
  { label: "Referrals", value: "24" },
  { label: "Active this month", value: "18" },
  { label: "Total earned", value: "$1,240" },
];

export default function AffiliatePage() {
  return (
    <main className="relative px-10 py-10">
      <CasinoPageHero
        title="Affiliate"
        subtitle="Invite friends, earn a share of their play, forever."
        icon="Handshake"
        from="#8a6516"
        to="#c99a33"
      />
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{ background: "var(--casino-surface)", border: "1px solid rgba(255,255,255,0.08)" }}
            className="rounded-lg p-5"
          >
            <p style={{ color: "var(--casino-text)" }} className="text-2xl font-black">
              {stat.value}
            </p>
            <p style={{ color: "var(--casino-muted)" }} className="text-xs mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <div style={{ background: "var(--casino-surface)", border: "1px solid rgba(255,255,255,0.08)" }} className="rounded-lg p-5 flex items-center justify-between">
        <div>
          <p style={{ color: "var(--casino-muted)" }} className="text-xs mb-1">
            Your referral link
          </p>
          <p style={{ color: "var(--casino-text)" }} className="text-sm font-semibold">
            luxe.app/r/abdnad23
          </p>
        </div>
        <button
          style={{ background: "var(--casino-accent)", color: "white" }}
          className="px-4 py-2 rounded-md text-sm font-bold hover:opacity-90 transition-opacity"
        >
          Copy link
        </button>
      </div>
    </main>
  );
} 