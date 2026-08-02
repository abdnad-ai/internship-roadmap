"use client";
import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api, getToken } from "@/lib/api";

export default function NewMonitorPage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [condition, setCondition] = useState("");
  const [sourceType, setSourceType] = useState("webpage");
  const [notifyByEmail, setNotifyByEmail] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!getToken()) router.replace("/login");
  }, [router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.createMonitor({ url, condition, sourceType, notifyByEmail });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create monitor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#E7EAF0]">
      <header className="border-b border-[#232A3D] px-6 py-4">
        <Link href="/dashboard" className="text-sm text-[#8A93A6] hover:text-[#E7EAF0]">← Back</Link>
      </header>
      <main className="max-w-lg mx-auto px-6 py-10">
        <h1 className="text-xl font-semibold tracking-tight mb-1">New monitor</h1>
        <p className="text-sm text-[#8A93A6] mb-8">Describe what you are waiting for, in plain English.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-mono text-[#8A93A6] mb-1.5">SOURCE TYPE</label>
            <div className="flex gap-2">
              {(["webpage", "api"] as const).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setSourceType(type)}
                  className={`px-3 py-1.5 rounded-md text-sm border ${
                    sourceType === type
                      ? "border-[#F5A623] text-[#F5A623] bg-[#F5A623]/10"
                      : "border-[#232A3D] text-[#8A93A6]"
                  }`}
                >
                  {type === "webpage" ? "Webpage" : "API endpoint"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#8A93A6] mb-1.5">URL</label>
            <input
              type="url"
              required
              placeholder="https://example.com/jobs"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-md bg-[#131826] border border-[#232A3D] px-3 py-2 text-[#E7EAF0] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#F5A623]/50 focus:border-[#F5A623]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#8A93A6] mb-1.5">CONDITION TO WATCH FOR</label>
            <textarea
              required
              rows={3}
              placeholder="e.g. a new job posting appears on this page"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full rounded-md bg-[#131826] border border-[#232A3D] px-3 py-2 text-[#E7EAF0] text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]/50 focus:border-[#F5A623] resize-none"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-[#8A93A6]">
            <input
              type="checkbox"
              checked={notifyByEmail}
              onChange={(e) => setNotifyByEmail(e.target.checked)}
              className="rounded border-[#232A3D] bg-[#131826] accent-[#F5A623]"
            />
            Email me when the condition is met
          </label>

          {error && <p className="text-sm text-[#F87171]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#F5A623] text-[#0B0E14] font-medium text-sm py-2.5 hover:bg-[#f0ad3d] transition-colors disabled:opacity-60"
          >
            {loading ? "Creating…" : "Create monitor"}
          </button>
        </form>
      </main>
    </div>
  );
}
