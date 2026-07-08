import Sidebar from "@/components/Sidebar";
import AmbientOrb from "@/components/AmbientOrb";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        ["--dash-bg" as string]: "#101113",
        ["--dash-surface" as string]: "#17181a",
        ["--dash-accent" as string]: "#b8443c",
        ["--dash-text" as string]: "#ededed",
        ["--dash-muted" as string]: "#8a8b8d",
        background: "var(--dash-bg)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AmbientOrb />
      <Sidebar />
      <div className="ml-64 relative z-10">{children}</div>
    </div>
  );
} 