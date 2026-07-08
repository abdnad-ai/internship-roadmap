import Image from "next/image";
import CasinoTopBar from "@/components/CasinoTopBar";

const ICON_BASE = "https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/128";
const sheen = "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 40%)";

export default function CasinoPageHero({
  title,
  subtitle,
  icon,
  from,
  to,
}: {
  title: string;
  subtitle: string;
  icon: string;
  from: string;
  to: string;
}) {
  return (
    <>
      <CasinoTopBar />
      <div
        style={{
          background: `${sheen}, linear-gradient(160deg, ${to} 0%, ${from} 100%)`,
          boxShadow: `0 0 30px -10px ${to}`,
        }}
        className="rounded-xl p-8 mb-10 flex items-center gap-6"
      >
        <Image src={`${ICON_BASE}/${icon}-3d-icon.png`} alt="" width={64} height={64} unoptimized />
        <div>
          <h1 style={{ color: "#f5f3ee" }} className="text-4xl font-black tracking-tight">
            {title}
          </h1>
          <p style={{ color: "#f5f3ee" }} className="text-sm opacity-80 mt-1">
            {subtitle}
          </p>
        </div>
      </div>
    </>
  );
} 