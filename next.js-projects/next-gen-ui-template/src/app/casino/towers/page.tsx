import CasinoPageHero from "@/components/CasinoPageHero";
import CasinoGameCard from "@/components/CasinoGameCard";

const variants = [
  { title: "Towers Classic", provider: "Aurum Studios", from: "#8a5620", to: "#b8722e", icon: "Bar-Chart" },
  { title: "Towers Extreme", provider: "Nightloom Games", from: "#4a148c", to: "#7b1fa2", icon: "Bar-Chart" },
  { title: "Towers Easy", provider: "Table House", from: "#0f5132", to: "#1e8449", icon: "Bar-Chart" },
  { title: "Towers VIP", provider: "Aurum Studios", from: "#8a2050", to: "#c9457e", icon: "Bar-Chart" },
];

export default function TowersPage() {
  return (
    <main className="relative px-10 py-10">
      <CasinoPageHero
        title="Towers"
        subtitle="Climb floor by floor, every level raises the stakes."
        icon="Bar-Chart"
        from="#8a5620"
        to="#b8722e"
      />
      <h2 style={{ color: "var(--casino-text)" }} className="text-base font-bold mb-4">
        Game variants
      </h2>
      <div className="grid grid-cols-4 gap-4">
        {variants.map((game) => (
          <CasinoGameCard key={game.title} {...game} />
        ))}
      </div>
    </main>
  );
} 