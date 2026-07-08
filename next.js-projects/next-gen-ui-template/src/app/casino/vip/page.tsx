import CasinoPageHero from "@/components/CasinoPageHero";

const tiers = [
  { name: "Bronze", requirement: "Starting tier", perks: ["5% cashback", "Weekly bonus"], color: "#b8722e" },
  { name: "Silver", requirement: "$5,000 wagered", perks: ["8% cashback", "Faster withdrawals"], color: "#8a8f99" },
  { name: "Gold", requirement: "$25,000 wagered", perks: ["12% cashback", "Dedicated host"], color: "#c99a33" },
  { name: "Platinum", requirement: "$100,000 wagered", perks: ["15% cashback", "Exclusive events"], color: "#7b1fa2" },
];

export default function VipPage() {
  return (
    <main className="relative px-10 py-10">
      <CasinoPageHero
        title="VIP Club"
        subtitle="The more you play, the more you get back."
        icon="Crown"
        from="#8a6516"
        to="#c99a33"
      />
      <h2 style={{ color: "var(--casino-text)" }} className="text-base font-bold mb-4">
        Tiers
      </h2>
      <div className="grid grid-cols-4 gap-4">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            style={{ background: "var(--casino-surface)", border: `1px solid ${tier.color}40` }}
            className="rounded-lg p-5"
          >
            <p style={{ color: tier.color }} className="text-lg font-black mb-1">
              {tier.name}
            </p>
            <p style={{ color: "var(--casino-muted)" }} className="text-xs mb-3">
              {tier.requirement}
            </p>
            <ul className="flex flex-col gap-1.5">
              {tier.perks.map((perk) => (
                <li key={perk} style={{ color: "var(--casino-text)" }} className="text-xs">
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
} 