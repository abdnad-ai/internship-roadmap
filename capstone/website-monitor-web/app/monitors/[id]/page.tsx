"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api, type MonitorDetail } from "@/lib/api";

export default function MonitorDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [monitor, setMonitor] = useState<MonitorDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await api.getMonitor(params.id);
      setMonitor(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load monitor");
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    const timeout = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timeout);
  }, [load]);

  async function handleCheckNow() {
    setChecking(true);
    try {
      await api.checkMonitor(params.id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Check failed");
    } finally {
      setChecking(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this monitor? This cannot be undone.")) return;
    await api.deleteMonitor(params.id);
    router.push("/dashboard");
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-white/50">Loading...</div>;
  }

  if (error || !monitor) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-[#F87171]">Error: {error || "Monitor not found"}</div>;
  }

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-2xl">
        <Link href="/dashboard" className="text-sm text-white/50 hover:text-white">
          Back
        </Link>

        <div className="mt-6 mb-2 flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${monitor.status === "active" ? "bg-white/70" : "bg-white/20"}`} />
          <span className="text-xs uppercase text-white/40">{monitor.sourceType}</span>
          <span className="text-xs text-white/40">{monitor.status}</span>
        </div>
        <p className="mb-1 break-all text-sm text-white">{monitor.url}</p>
        <p className="mb-6 text-white/60">{monitor.condition}</p>

        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={handleCheckNow}
            disabled={checking}
            className="liquid-glass-strong rounded-full bg-[#34D399]/15 px-5 py-2.5 text-sm font-medium text-[#34D399] transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {checking ? "Checking..." : "Check now"}
          </button>
          <Link
            href={`/monitors/${params.id}/edit`}
            className="liquid-glass rounded-full bg-[#A78BFA]/15 px-5 py-2.5 text-sm font-medium text-[#A78BFA] transition-colors hover:bg-[#A78BFA]/25"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="liquid-glass rounded-full bg-[#F87171]/15 px-5 py-2.5 text-sm font-medium text-[#F87171] transition-colors hover:bg-[#F87171]/25"
          >
            Delete
          </button>
        </div>

        <h2 className="mb-3 text-xs uppercase tracking-widest text-white/40">Check history</h2>

        {monitor.checkLogs.length === 0 ? (
          <div className="liquid-glass rounded-2xl px-5 py-8 text-center">
            <p className="text-sm text-white/50">No checks yet. Run one to see it here.</p>
          </div>
        ) : (
          <div className="liquid-glass divide-y divide-white/[0.06] overflow-hidden rounded-2xl">
            {monitor.checkLogs.map((log) => (
              <div key={log.id} className="px-4 py-3 text-xs">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-white/40">{new Date(log.checkedAt).toLocaleString()}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide ${log.aiVerdict ? "bg-[#34D399]/15 text-[#34D399]" : "bg-white/5 text-white/40"}`}>
                    {log.aiVerdict ? "Met" : "Not met"}
                  </span>
                </div>
                <p className="text-sm text-white/80">{log.aiReasoning}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}