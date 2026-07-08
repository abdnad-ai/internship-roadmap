import CasinoSidebar from "@/components/CasinoSidebar";

export default function CasinoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        ["--casino-bg" as string]: "#0f0a14",
        ["--casino-surface" as string]: "#1c1420",
        ["--casino-accent" as string]: "#ff4d8d",
        ["--casino-accent-bright" as string]: "#ff7aab",
        ["--casino-text" as string]: "#ffffff",
        ["--casino-muted" as string]: "#9a8fa3",
        background: "var(--casino-bg)",
        minHeight: "100vh",
      }}
    >
      <CasinoSidebar />
      <div className="ml-64">{children}</div>
    </div>
  );
} 