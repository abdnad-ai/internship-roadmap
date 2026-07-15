import Image from "next/image";

const ICON_BASE = "https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/128";

export default function CasinoWelcomeCard() {
  return (
    <div
      style={{
        background: "linear-gradient(150deg, var(--casino-accent) 0%, var(--casino-surface) 80%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      className="rounded-lg p-5 flex flex-col justify-between h-full"
    >
      <div className="flex items-center gap-3">
        <div
          style={{ background: "rgba(255,255,255,0.2)" }}
          className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-black text-white"
        >
          CA
        </div>
        <div>
          <p style={{ color: "white" }} className="text-sm font-bold">
            Welcome back, abdnad
          </p> 
          <p style={{ color: "rgba(255,255,255,0.7)" }} className="text-xs">
            Member since Jun 2026
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Image src={`${ICON_BASE}/Crown-3d-icon.png`} alt="" width={18} height={18} unoptimized />
        <span style={{ color: "white" }} className="text-xs font-semibold">
          Gold tier · 2,340 loyalty points
        </span>
      </div>
    </div>
  );
} 