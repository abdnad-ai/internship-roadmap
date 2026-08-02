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
    return (
      <div className="min-h-screen bg-[#0B0E14] text-[#8A93A6] flex items-center justify-center font-mono text-sm">
        Loading...
      </div>
    );
  }

  if (error || !monitor) {
    return (
      <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center">
        <p className="text-[#F87171] text-sm">{error || "Monitor not found"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#E7EAF0]">
      <header className="border-b border-[#232A3D] px-6 py-4">
        <Link href="/dashboard" className="text-sm text-[#8A93A6] hover:text-[#E7EAF0]">Back</Link>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`w-2 h-2 rounded-full ${
              monitor.status === "active" ? "bg-[#F5A623] animate-pulse" : "bg-[#8A93A6]"
            }`}
          />
          <span className="text-xs font-mono text-[#8A93A6] uppercase">{monitor.sourceType}</span>
          <span className="text-xs font-mono text-[#8A93A6]">{monitor.status}</span>
        </div>
        <p className="font-mono text-sm text-[#E7EAF0] break-all mb-1">{monitor.url}</p>
        <p className="text-[#8A93A6] mb-6">{monitor.condition}</p>

        <div className="flex gap-3 mb-8">
          <button
            onClick={handleCheckNow}
            disabled={checking}
            className="rounded-md bg-[#F5A623] text-[#0B0E14] font-medium text-sm px-4 py-2 hover:bg-[#f0ad3d] transition-colors disabled:opacity-60"
          >
            {checking ? "Checking..." : "Check now"}
          </button>
          <button
            onClick={handleDelete}
            className="rounded-md border border-[#232A3D] text-sm px-4 py-2 text-[#8A93A6] hover:text-[#F87171] hover:border-[#F87171]/40 transition-colors"
          >
            Delete
          </button>
          <Link href={`/monitors/${params.id}/edit`} className="rounded-md border border-[#232A3D] text-sm px-4 py-2 text-[#8A93A6] hover:text-[#F5A623] hover:border-[#F5A623]/40 transition-colors">
            Edit
          </Link>
        </div>

        <h2 className="text-xs font-mono text-[#8A93A6] uppercase tracking-wide mb-3">Check history</h2>

        {monitor.checkLogs.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#232A3D] px-5 py-8 text-center">
            <p className="text-sm text-[#8A93A6]">No checks yet. Run one to see it here.</p>
          </div>
        ) : (
          <div className="rounded-lg border border-[#232A3D] bg-[#131826] divide-y divide-[#232A3D] overflow-hidden">
            {monitor.checkLogs.map((log) => (
              <div key={log.id} className="px-4 py-3 font-mono text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#8A93A6]">{new Date(log.checkedAt).toLocaleString()}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wide ${
                      log.aiVerdict ? "bg-[#34D399]/15 text-[#34D399]" : "bg-[#232A3D] text-[#8A93A6]"
                    }`}
                  >
                    {log.aiVerdict ? "Met" : "Not met"}
                  </span>
                </div>
                <p className="text-[#E7EAF0] font-sans text-sm">{log.aiReasoning}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
