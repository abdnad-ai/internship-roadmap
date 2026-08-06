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

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-white/65">Loading...</div>;
  }

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-lg">
        <Link href={`/monitors/${params.id}`} className="text-sm text-white/65 hover:text-white">
          Back
        </Link>

        <h1 className="mt-6 text-4xl font-medium tracking-[-1.5px] text-white">
          Edit{" "}
          <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-white/80">monitor</span>
        </h1>
        <p className="mt-3 mb-8 text-sm text-white/65">Update what watchpost should look for.</p>

        <form onSubmit={handleSubmit} className="liquid-glass space-y-5 rounded-2xl bg-white/[0.02] p-6 md:p-8">
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/40">Source type</label>
            <div className="flex gap-2">
              {(["webpage", "api"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSourceType(type)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    sourceType === type ? "border-white text-white" : "border-white/20 text-white/40"
                  }`}
                >
                  {type === "webpage" ? "Webpage" : "API endpoint"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/40">URL</label>
            <input
              type="url"
              required
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/40">Condition to watch for</label>
            <textarea
              required
              rows={3}
              value={condition}
              onChange={(event) => setCondition(event.target.value)}
              className="w-full resize-none rounded-lg border border-white/20 bg-transparent px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-white/65">
            <input
              type="checkbox"
              checked={notifyByEmail}
              onChange={(event) => setNotifyByEmail(event.target.checked)}
              className="accent-white"
            />
            Email me when the condition is met
          </label>

          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/40">Status</label>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40"
            >
              <option value="active" className="bg-black">Active</option>
              <option value="paused" className="bg-black">Paused</option>
            </select>
          </div>

          {error && <p className="text-sm text-[#F87171]">Error: {error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-white py-3 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}