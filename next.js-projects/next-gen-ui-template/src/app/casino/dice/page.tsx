import CasinoPageHero from "@/components/CasinoPageHero";
import CasinoGameCard from "@/components/CasinoGameCard";

const variants = [
  { title: "Dice Classic", provider: "Table House", from: "#8a5620", to: "#b8722e", icon: "Game-Die" },
  { title: "Dice Duel", provider: "Nightloom Games", from: "#4a148c", to: "#7b1fa2", icon: "Game-Die" },
  { title: "Dice High Roll", provider: "Aurum Studios", from: "#8a2050", to: "#c9457e", icon: "Game-Die" },
  { title: "Dice Streak", provider: "Table House", from: "#0f6e6e", to: "#17a2a2", icon: "Game-Die" },
];

export default function DicePage() {
  return (
    <main className="relative px-10 py-10">
      <CasinoPageHero
        title="Dice"
        subtitle="Set your odds, roll, and let the numbers decide."
        icon="Game-Die"
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