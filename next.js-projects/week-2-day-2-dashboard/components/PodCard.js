export default function PodCard({ name, members, energy, specialty }) {
  return (
    <article className="rounded-[2rem] border border-[#3a2d4f] bg-[#1d172a]/90 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black text-[#f6efe7]">{name}</h3>
        <span className="rounded-full bg-[#2a2038] px-4 py-2 text-sm text-[#d7a84f]">
          {energy}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-[#b8afc7]">{specialty}</p>

      <div className="mt-6 flex -space-x-3">
        {members.map((member) => (
          <div
            key={member}
            className="grid h-11 w-11 place-items-center rounded-full border-2 border-[#1d172a] bg-[#d7a84f] text-sm font-black text-[#120f1a]"
          >
            {member}
          </div>
        ))}
      </div>
    </article>
  );
}