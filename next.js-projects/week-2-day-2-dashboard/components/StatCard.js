export default function StatCard({ title, value, note }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
      <p className="text-sm text-slate-400">{title}</p>
      <h2 className="mt-3 text-3xl font-bold text-white">{value}</h2>
      <p className="mt-2 text-sm text-cyan-400">{note}</p>
    </div>
  );
} 