 "use client"; 

import Image from "next/image"; 
import { motion } from "framer-motion";
import CasinoTopBar from "@/components/CasinoTopBar";

const ICON_BASE = "https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/256";

const sheen = "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 40%)";

const wins = [
  { name: "George", game: "Golden Reels", amount: "$8,763.78", color: "#d9a441" },
  { name: "Marcus", game: "Emerald Fortune", amount: "$5,204.12", color: "#3d9e6e" },
  { name: "Jerry Maguire", game: "Velvet Blackjack", amount: "$3,190.50", color: "#c9457e" },
  { name: "Michael SScott", game: "Copper Roulette", amount: "$2,880.00", color: "#3d9e9e" },
];
 
const slots = [
  { title: "Golden Reels", provider: "Aurum Studios", from: "#8a6516", to: "#c99a33", icon: "Coin" },
  { title: "Emerald Fortune", provider: "Nightloom Games", from: "#0f5132", to: "#1e8449", icon: "Gem-Stone" },
  { title: "Sweet Scatter", provider: "Nightloom Games", from: "#8a2050", to: "#c9457e", icon: "Candy" },
  { title: "Diamond Hunt", provider: "Aurum Studios", from: "#0f6e6e", to: "#17a2a2", icon: "Diamond-With-A-Dot" },
  { title: "Coin Strike", provider: "Table House", from: "#4a148c", to: "#7b1fa2", icon: "Money-Bag" },
];

const tileVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.06 },
  }),
};

export default function CasinoLobbyPage() {
  return (
    <main className="relative px-10 py-10 overflow-hidden">
      <div
        className="absolute top-[-10%] left-[25%] w-[500px] h-[500px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "#ff4d8d" }}
      />

      <CasinoTopBar />

      <div className="relative z-10 mb-10">
        <h1
          style={{ color: "var(--casino-text)" }}
          className="text-[96px] leading-[0.85] font-black tracking-tighter"
        >
          PLAY
          <span style={{ color: "var(--casino-accent)" }}>.</span>
        </h1>
        <p style={{ color: "var(--casino-muted)" }} className="text-sm mt-3 max-w-sm">
          Curated games, clear odds, no clutter. Everything you need, nothing you don't.
        </p>
      </div>

      <div
        className="relative z-10 grid gap-4 mb-10"
        style={{ gridTemplateColumns: "1.4fr 0.8fr 0.8fr", gridTemplateRows: "auto auto" }}
      >
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={tileVariants}
          whileHover={{ scale: 1.01 }}
          style={{
            gridRow: "span 2",
            background: `${sheen}, linear-gradient(160deg, #1e8449 0%, #0f5132 100%)`,
            boxShadow: "0 0 30px -10px #1e8449",
          }}
          className="rounded-xl p-6 flex flex-col justify-between cursor-pointer"
        >
          <Image src={`${ICON_BASE}/Money-Bag-3d-icon.png`} alt="" width={56} height={56} unoptimized />
          <div>
            <p style={{ color: "#f5f3ee" }} className="text-2xl font-black">
              Deposit
            </p>
            <p style={{ color: "#d8e8dc" }} className="text-sm font-semibold">
              Bonus 160% on your first top-up
            </p>
          </div>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={tileVariants}
          whileHover={{ scale: 1.02 }}
          style={{
            background: `${sheen}, linear-gradient(160deg, #7b1fa2 0%, #4a148c 100%)`,
            boxShadow: "0 0 24px -10px #7b1fa2",
          }}
          className="rounded-xl p-6 flex flex-col justify-between h-32 cursor-pointer"
        >
          <Image src={`${ICON_BASE}/Slot-Machine-3d-icon.png`} alt="" width={40} height={40} unoptimized />
          <p style={{ color: "#f5f3ee" }} className="text-base font-bold">
            Wheel
          </p>
        </motion.div>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={tileVariants}
          whileHover={{ scale: 1.02 }}
          style={{
            background: `${sheen}, linear-gradient(160deg, #1565c0 0%, #0d47a1 100%)`,
            boxShadow: "0 0 24px -10px #1565c0",
          }}
          className="rounded-xl p-6 flex flex-col justify-between h-32 cursor-pointer"
        >
          <Image src={`${ICON_BASE}/Wrapped-Gift-3d-icon.png`} alt="" width={40} height={40} unoptimized />
          <p style={{ color: "#f5f3ee" }} className="text-base font-bold">
            Rewards
          </p>
        </motion.div>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={tileVariants}
          whileHover={{ scale: 1.02 }}
          style={{
            background: `${sheen}, linear-gradient(160deg, #b8722e 0%, #8a5620 100%)`,
            boxShadow: "0 0 24px -10px #b8722e",
          }}
          className="rounded-xl p-6 flex flex-col justify-between h-32 cursor-pointer"
        >
          <Image src={`${ICON_BASE}/Spade-Suit-3d-icon.png`} alt="" width={40} height={40} unoptimized />
          <p style={{ color: "#f5f3ee" }} className="text-base font-bold">
            Casino
          </p>
        </motion.div>

        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={tileVariants}
          whileHover={{ scale: 1.02 }}
          style={{
            background: `${sheen}, linear-gradient(160deg, #5b2c82 0%, #3d1c5c 100%)`,
            boxShadow: "0 0 24px -10px #5b2c82",
          }}
          className="rounded-xl p-6 flex flex-col justify-between h-32 cursor-pointer"
        >
          <Image src={`${ICON_BASE}/Bomb-3d-icon.png`} alt="" width={40} height={40} unoptimized />
          <p style={{ color: "#f5f3ee" }} className="text-base font-bold">
            Mines
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-4 mb-10">
        <div
          style={{
            background: "linear-gradient(120deg, #17a2a2 0%, #1c1420 70%)",
            border: "1px solid #17a2a255",
          }}
          className="rounded-xl p-6 flex items-center gap-4"
        >
          <Image src={`${ICON_BASE}/Rocket-3d-icon.png`} alt="" width={48} height={48} unoptimized />
          <div>
            <p style={{ color: "#5fd9d9" }} className="text-xs font-bold uppercase tracking-wide">
              New game
            </p>
            <h3 style={{ color: "var(--casino-text)" }} className="text-lg font-bold">
              Crush
            </h3>
          </div>
        </div>
        <div
          style={{
            background: "linear-gradient(120deg, #c99a33 0%, #1c1420 70%)",
            border: "1px solid #c99a3355",
          }}
          className="rounded-xl p-6 flex items-center gap-4" 
        >
          <Image src={`${ICON_BASE}/Trophy-3d-icon.png`} alt="" width={48} height={48} unoptimized />
          <div>
            <p style={{ color: "#e8c56b" }} className="text-xs font-bold uppercase tracking-wide">
              Free rewards
            </p>
            <h3 style={{ color: "var(--casino-text)" }} className="text-lg font-bold">
              Daily claim 
            </h3>
          </div>
        </div>
      </div>

      <h2 style={{ color: "var(--casino-text)" }} className="relative z-10 text-base font-bold mb-4">
        Top wins
      </h2>
      <div className="relative z-10 grid grid-cols-4 gap-4 mb-10">
        {wins.map((win, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={tileVariants}
            style={{ background: "var(--casino-surface)", border: `1px solid ${win.color}40` }}
            className="rounded-lg p-4 flex items-center gap-3"
          >
            <div style={{ background: win.color }} className="w-9 h-9 rounded-full flex-shrink-0" />
            <div className="min-w-0">
              <p style={{ color: "var(--casino-text)" }} className="text-xs font-semibold truncate">
                {win.name}
              </p>
              <p style={{ color: "var(--casino-muted)" }} className="text-[11px] truncate">
                {win.game}
              </p>
            </div>
            <p style={{ color: win.color }} className="text-xs font-bold ml-auto flex-shrink-0">
              {win.amount}
            </p>
          </motion.div>
        ))}
      </div>

      <h2 style={{ color: "var(--casino-text)" }} className="relative z-10 text-base font-bold mb-4">
        Top slot games
      </h2>
      <div className="relative z-10 grid grid-cols-5 gap-4">
        {slots.map((game, i) => (
          <motion.div
            key={game.title}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={tileVariants}
            whileHover={{ scale: 1.03 }}
            style={{
              background: `${sheen}, linear-gradient(160deg, ${game.to} 0%, ${game.from} 100%)`,
              boxShadow: `0 0 24px -10px ${game.to}`,
            }}
            className="rounded-lg h-40 flex flex-col items-center justify-center gap-2 cursor-pointer"
          >
            <Image src={`${ICON_BASE}/${game.icon}-3d-icon.png`} alt="" width={40} height={40} unoptimized />
            <p style={{ color: "#f5f3ee" }} className="text-xs font-bold text-center px-2">
              {game.title}
            </p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}  