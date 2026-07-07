import HeroScene from "@/components/HeroScene";
import Nav from "@/components/Nav";
import CountUp from "@/components/CountUp";

const stats = [
  { label: "Active sessions", value: 1284, suffix: "", decimals: 0 },
  { label: "Avg response time", value: 0.8, suffix: "s", decimals: 1 },
  { label: "Prompts processed", value: 48200, suffix: "", decimals: 0 },
];

const features = [
  {
    title: "Live streaming responses",
    description: "Watch answers form in real time, chunk by chunk, no waiting on a spinner.",
    accent: "green",
  },
  {
    title: "Prompt templates",
    description: "Reusable structured prompts with variable substitution built in.",
    accent: "maroon",
  },
  {
    title: "Session history",
    description: "Every conversation saved and searchable, picked up right where you left off.",
    accent: "green",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] overflow-hidden">
      <Nav />

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(34,120,90,0.12), transparent 55%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-80 scale-150">
          <HeroScene />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,20,16,0.2) 0%, rgba(13,20,16,0.5) 60%, rgba(13,20,16,0.95) 100%)",
          }}
        />
        <div className="relative z-10 text-center max-w-2xl px-10">
          <p className="font-mono-stat text-sm font-bold tracking-[0.3em] text-[var(--color-green-bright)] uppercase mb-4">
            AI infrastructure, reimagined
          </p>
<h1 className="font-display text-9xl font-semibold leading-[0.95] text-[var(--color-text)]">            Built for the
            <br /> 
            <span className="text-[var(--color-green-bright)]">next</span>{" "}
            <span className="text-[var(--color-maroon-bright)]">level</span>
          </h1>
          <p className="mt-6 text-lg text-[var(--color-text-muted)] max-w-md mx-auto">
            An AI interface engineered for speed, clarity, and momentum.
          </p> 
          <button className="mt-8 px-6 py-3 rounded-md bg-[var(--color-text)] text-[var(--color-bg)] font-medium hover:bg-white transition-colors">
            Start a session
          </button>
        </div>
      </section>

      <section className="relative px-10 py-20 grid grid-cols-3 gap-6 border-t border-white/5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="relative rounded-lg bg-[var(--color-surface)] p-8 border border-white/5 overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[var(--color-green-bright)]/10 blur-2xl" />
            <p className="font-mono-stat text-5xl text-[var(--color-text)] relative z-10">
              <CountUp target={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
            </p>
            <p className="mt-3 text-sm text-[var(--color-text-muted)] relative z-10">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="px-10 pb-28 grid grid-cols-3 gap-6">
        {features.map((feature) => {
          const glow =
            feature.accent === "green"
              ? "hover:shadow-[0_0_30px_-8px_rgba(34,120,90,0.5)] hover:border-[var(--color-green-bright)]/50"
              : "hover:shadow-[0_0_30px_-8px_rgba(199,56,56,0.5)] hover:border-[var(--color-maroon-bright)]/50";
          return (
            <div
              key={feature.title}
              className={`rounded-lg bg-[var(--color-surface)] p-7 border border-white/5 transition-all duration-300 ${glow}`}
            >
              <h3 className="font-display text-2xl font-semibold text-[var(--color-text)]">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </section>
    </main>
  );
} 