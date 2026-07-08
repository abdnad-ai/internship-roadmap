import Image from "next/image";

const ICON_BASE = "https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/128";
const sheen = "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 40%)";

export default function CasinoGameCard({
  title,
  provider,
  icon,
  from,
  to,
}: {
  title: string;
  provider: string;
  icon: string;
  from: string;
  to: string;
}) {
  return (
    <div
      style={{
        background: `${sheen}, linear-gradient(160deg, ${to} 0%, ${from} 100%)`,
        boxShadow: `0 0 24px -10px ${to}`,
      }}
      className="rounded-lg h-40 flex flex-col items-center justify-center gap-2 hover:scale-[1.03] transition-transform cursor-pointer"
    >
      <Image src={`${ICON_BASE}/${icon}-3d-icon.png`} alt="" width={40} height={40} unoptimized />
      <div className="text-center px-2">
        <p style={{ color: "#f5f3ee" }} className="text-xs font-bold">
          {title}
        </p>
        <p style={{ color: "#f5f3eeaa" }} className="text-[10px] mt-0.5">
          {provider}
        </p>
      </div>
    </div>
  );
} 