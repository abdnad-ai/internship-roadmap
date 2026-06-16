export default function PageHeader({ eyebrow, title, description, accent = "gold" }) {
  const accents = {
    gold: "text-[#d7a84f]",
    rose: "text-[#e56b8c]",
    mint: "text-[#7bdcb5]",
    violet: "text-[#9d7cff]",
  };

  return (
    <header className="rounded-[2rem] border border-[#3a2d4f] bg-[#1d172a]/90 p-7 shadow-2xl shadow-black/20">
      <p className={`text-xs uppercase tracking-[0.45em] ${accents[accent]}`}>
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-[#f6efe7] md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[#b8afc7]">
        {description}
      </p>
    </header>
  );
} 