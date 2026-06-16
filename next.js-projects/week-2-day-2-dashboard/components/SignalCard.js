export default function SignalCard({ label, value, description, accent = "gold" }) {
  const accents = {
    gold: "text-[#d7a84f] border-[#d7a84f]/30",
    rose: "text-[#e56b8c] border-[#e56b8c]/30",
    mint: "text-[#7bdcb5] border-[#7bdcb5]/30",
    violet: "text-[#9d7cff] border-[#9d7cff]/30",
  };

  return (
    <article className={`rounded-[2rem] border bg-[#1d172a]/90 p-6 ${accents[accent]}`}>
      <p className="text-sm text-[#b8afc7]">{label}</p>
      <h3 className={`mt-4 text-4xl font-black ${accents[accent].split(" ")[0]}`}>
        {value}
      </h3>
      <p className="mt-4 text-sm leading-6 text-[#f6efe7]">{description}</p>
    </article>
  );
} 