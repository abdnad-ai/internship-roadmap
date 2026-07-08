import CasinoPageHero from "@/components/CasinoPageHero";
import CasinoGameCard from "@/components/CasinoGameCard";

const variants = [
  { title: "European Roulette", provider: "Table House", from: "#0f5132", to: "#1e8449", icon: "Slot-Machine" },
  { title: "American Roulette", provider: "Table House", from: "#4a148c", to: "#7b1fa2", icon: "Slot-Machine" },
  { title: "Speed Roulette", provider: "Aurum Studios", from: "#8a2050", to: "#c9457e", icon: "Slot-Machine" },
  { title: "Lightning Roulette", provider: "Nightloom Games", from: "#0f6e6e", to: "#17a2a2", icon: "Slot-Machine" },
];

export default function RoulettePage() {
  return (
    <main className="relative px-10 py-10">
      <CasinoPageHero
        title="Roulette"
        subtitle="Pick your number, spin the wheel, watch it land."
        icon="Slot-Machine"
        from="#4a148c"
        to="#7b1fa2"
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