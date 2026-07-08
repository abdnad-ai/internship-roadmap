import CasinoPageHero from "@/components/CasinoPageHero";

const rankings = [
  { rank: 1, name: "George", wagered: "$142,300", color: "#ffc93d" },
  { rank: 2, name: "Marcus", wagered: "$118,750", color: "#c9c9c9" },
  { rank: 3, name: "Jerry Maguire", wagered: "$96,420", color: "#c9803d" },
  { rank: 4, name: "Michael Scott", wagered: "$81,200", color: "var(--casino-muted)" },
  { rank: 5, name: "Master Roshi", wagered: "$74,900", color: "var(--casino-muted)" },
]; 

export default function LeaderboardPage() {
  return (
    <main className="relative px-10 py-10">
      <CasinoPageHero
        title="Leaderboard"
        subtitle="This week's top wagerers, updated live."
        icon="Bar-Chart"
        from="#5b2c82"
        to="#7b1fa2"
      />
      <div style={{ background: "var(--casino-surface)", border: "1px solid rgba(255,255,255,0.08)" }} className="rounded-lg overflow-hidden">
        {rankings.map((entry) => (
          <div
            key={entry.rank}
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            className="flex items-center gap-4 px-5 py-4"
          >
            <span style={{ color: entry.color }} className="text-lg font-black w-6">
              {entry.rank}
            </span>
            <span style={{ color: "var(--casino-text)" }} className="text-sm font-semibold flex-1">
              {entry.name}
            </span>
            <span style={{ color: "var(--casino-muted)" }} className="text-sm">
              {entry.wagered}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
} 