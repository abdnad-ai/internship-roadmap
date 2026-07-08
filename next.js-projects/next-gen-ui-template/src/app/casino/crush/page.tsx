import CasinoPageHero from "@/components/CasinoPageHero";
import CasinoGameCard from "@/components/CasinoGameCard";

const variants = [
  { title: "Crush Classic", provider: "Aurum Studios", from: "#0f6e6e", to: "#17a2a2", icon: "Rocket" },
  { title: "Crush Turbo", provider: "Nightloom Games", from: "#8a2050", to: "#c9457e", icon: "Rocket" },
  { title: "Crush Multiplier", provider: "Table House", from: "#4a148c", to: "#7b1fa2", icon: "Rocket" },
  { title: "Crush Nightly", provider: "Aurum Studios", from: "#0f5132", to: "#1e8449", icon: "Rocket" },
];

export default function CrushPage() {
  return (
    <main className="relative px-10 py-10">
      <CasinoPageHero
        title="Crush"
        subtitle="Watch the multiplier climb, cash out before it crashes."
        icon="Rocket"
        from="#0f6e6e"
        to="#17a2a2"
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