import CasinoPageHero from "@/components/CasinoPageHero";

const promos = [
  { title: "VIP transfers now live", subtitle: "Unlock instant benefits, transfer your status", color: "#ff4d8d" },
  { title: "Lifetime bonus, free spins", subtitle: "Earn lifetime commission, plus free spins on referrals", color: "#3dd8dc" },
  { title: "Weekend cashback", subtitle: "10% back on net losses every weekend", color: "#ffc93d" },
  { title: "Tournament of the week", subtitle: "Top the leaderboard for a share of $10,000", color: "#9a4dff" },
];

export default function PromotionsPage() {
  return (
    <main className="relative px-10 py-10">
      <CasinoPageHero
        title="Promotions"
        subtitle="Everything running right now, in one place."
        icon="Trophy"
        from="#8a6516"
        to="#c99a33"
      />
      <div className="grid grid-cols-2 gap-4">
        {promos.map((promo) => (
          <div
            key={promo.title}
            style={{
              background: `linear-gradient(135deg, ${promo.color}33 0%, var(--casino-surface) 60%)`,
              border: `1px solid ${promo.color}55`,
            }}
            className="rounded-xl p-6"
          >
            <p style={{ color: promo.color }} className="text-xs font-bold uppercase tracking-wide mb-2">
              Promotion
            </p>
            <h3 style={{ color: "var(--casino-text)" }} className="text-lg font-bold mb-1">
              {promo.title}
            </h3>
            <p style={{ color: "var(--casino-muted)" }} className="text-xs">
              {promo.subtitle}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
} 