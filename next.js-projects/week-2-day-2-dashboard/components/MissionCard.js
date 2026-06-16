export default function MissionCard({ title, level, match, focus, accent }) {
  return (
    <article className="rounded-[2rem] border border-[#3a2d4f] bg-[#1d172a]/90 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-xs uppercase tracking-[0.35em] ${accent}`}>
            {level}
          </p>
          <h3 className="mt-3 text-2xl font-black text-[#f6efe7]">{title}</h3>
        </div>

        <div className="rounded-full bg-[#120f1a] px-4 py-2 text-sm font-bold text-[#7bdcb5]">
          {match}
        </div>
      </div>

      <p className="mt-6 text-sm leading-6 text-[#b8afc7]">{focus}</p>

      <button className="mt-6 rounded-full border border-[#d7a84f] px-5 py-3 text-sm font-bold text-[#d7a84f] hover:bg-[#d7a84f] hover:text-[#120f1a]">
        View Mission
      </button>
    </article>
  );
} 