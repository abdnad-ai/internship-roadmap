export default function Header() {
  return (
    <header className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-800 bg-slate-950 p-6 md:flex-row md:items-center">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          Week 2 Day 2
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">
          Dashboard Layout
        </h1>
        <p className="mt-2 text-slate-400">
          Practicing reusable components, Tailwind UI structure, and users data layout.
        </p>
      </div>

      <button className="rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-300">
        Add User
      </button>
    </header>
  );
} 