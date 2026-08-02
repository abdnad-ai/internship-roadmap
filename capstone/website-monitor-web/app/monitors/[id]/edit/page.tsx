"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function EditMonitorPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [condition, setCondition] = useState("");
  const [sourceType, setSourceType] = useState("webpage");
  const [notifyByEmail, setNotifyByEmail] = useState(false);
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const monitor = await api.getMonitor(params.id);
      setUrl(monitor.url);
      setCondition(monitor.condition);
      setSourceType(monitor.sourceType);
      setNotifyByEmail(monitor.notifyByEmail);
      setStatus(monitor.status);
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

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      await api.updateMonitor(params.id, { url, condition, sourceType, notifyByEmail, status });
      router.push(`/monitors/${params.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save monitor");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="min-h-screen bg-[#0B0E14] text-[#8A93A6] flex items-center justify-center font-mono text-sm">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#E7EAF0]">
      <header className="border-b border-[#232A3D] px-6 py-4"><Link href={`/monitors/${params.id}`} className="text-sm text-[#8A93A6] hover:text-[#E7EAF0]">Back</Link></header>
      <main className="max-w-lg mx-auto px-6 py-10">
        <h1 className="text-xl font-semibold tracking-tight mb-1">Edit monitor</h1>
        <p className="text-sm text-[#8A93A6] mb-8">Update what Watchpost should look for.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-mono text-[#8A93A6] mb-1.5">SOURCE TYPE</label>
            <div className="flex gap-2">{(["webpage", "api"] as const).map((type) => <button key={type} type="button" onClick={() => setSourceType(type)} className={`px-3 py-1.5 rounded-md text-sm border ${sourceType === type ? "border-[#F5A623] text-[#F5A623] bg-[#F5A623]/10" : "border-[#232A3D] text-[#8A93A6]"}`}>{type === "webpage" ? "Webpage" : "API endpoint"}</button>)}</div>
          </div>
          <div><label className="block text-xs font-mono text-[#8A93A6] mb-1.5">URL</label><input type="url" required value={url} onChange={(event) => setUrl(event.target.value)} className="w-full rounded-md bg-[#131826] border border-[#232A3D] px-3 py-2 text-[#E7EAF0] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#F5A623]/50 focus:border-[#F5A623]" /></div>
          <div><label className="block text-xs font-mono text-[#8A93A6] mb-1.5">CONDITION TO WATCH FOR</label><textarea required rows={3} value={condition} onChange={(event) => setCondition(event.target.value)} className="w-full rounded-md bg-[#131826] border border-[#232A3D] px-3 py-2 text-[#E7EAF0] text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]/50 focus:border-[#F5A623] resize-none" /></div>
          <label className="flex items-center gap-2 text-sm text-[#8A93A6]"><input type="checkbox" checked={notifyByEmail} onChange={(event) => setNotifyByEmail(event.target.checked)} className="rounded border-[#232A3D] bg-[#131826] accent-[#F5A623]" />Email me when the condition is met</label>
          <div><label className="block text-xs font-mono text-[#8A93A6] mb-1.5">STATUS</label><select value={status} onChange={(event) => setStatus(event.target.value)} className="w-full rounded-md bg-[#131826] border border-[#232A3D] px-3 py-2 text-[#E7EAF0] text-sm"><option value="active">Active</option><option value="paused">Paused</option></select></div>
          {error && <p className="text-sm text-[#F87171]">{error}</p>}
          <button type="submit" disabled={saving} className="w-full rounded-md bg-[#F5A623] text-[#0B0E14] font-medium text-sm py-2.5 hover:bg-[#f0ad3d] transition-colors disabled:opacity-60">{saving ? "Saving..." : "Save changes"}</button>
        </form>
      </main>
    </div>
  );
}
