import CasinoPageHero from "@/components/CasinoPageHero";
import CasinoGameCard from "@/components/CasinoGameCard";

const variants = [
  { title: "Mines Classic", provider: "Aurum Studios", from: "#3d1c5c", to: "#5b2c82", icon: "Bomb" },
  { title: "Mines Hardcore", provider: "Nightloom Games", from: "#8a2050", to: "#c9457e", icon: "Bomb" },
  { title: "Mines Easy", provider: "Table House", from: "#0f5132", to: "#1e8449", icon: "Bomb" },
  { title: "Mines Gold", provider: "Aurum Studios", from: "#8a6516", to: "#c99a33", icon: "Bomb" },
];

export default function MinesPage() {
  return (
    <main className="relative px-10 py-10">
      <CasinoPageHero
        title="Mines"
        subtitle="Reveal tiles, avoid the mines, cash out anytime."
        icon="Bomb"
        from="#3d1c5c"
        to="#5b2c82"
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