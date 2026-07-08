import CasinoPageHero from "@/components/CasinoPageHero";
import CasinoGameCard from "@/components/CasinoGameCard";

const variants = [
  { title: "Plinko Classic", provider: "Aurum Studios", from: "#8a2050", to: "#c9457e", icon: "Game-Die" },
  { title: "Plinko Gold", provider: "Nightloom Games", from: "#8a6516", to: "#c99a33", icon: "Game-Die" },
  { title: "Plinko Extreme", provider: "Table House", from: "#4a148c", to: "#7b1fa2", icon: "Game-Die" },
  { title: "Plinko Mini", provider: "Aurum Studios", from: "#0f5132", to: "#1e8449", icon: "Game-Die" },
];

export default function PlinkoPage() {
  return (
    <main className="relative px-10 py-10">
      <CasinoPageHero
        title="Plinko"
        subtitle="Drop the ball, watch it bounce, land on your multiplier."
        icon="Game-Die"
        from="#8a2050"
        to="#c9457e"
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