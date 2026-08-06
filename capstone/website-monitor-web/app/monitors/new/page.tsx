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
    <div className="min-h-screen px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-lg">
        <Link href="/dashboard" className="text-sm text-white/50 hover:text-white">
          Back
        </Link>

        <h1 className="mt-6 text-4xl tracking-[-0.03em] text-white">
          New{" "}
          <span className="font-[family-name:var(--font-source-serif)] italic text-white/80">monitor</span>
        </h1>
        <p className="mt-2 mb-8 text-sm text-white/50">Describe what you are waiting for, in plain English.</p>

        <form onSubmit={handleSubmit} className="liquid-glass-strong space-y-5 rounded-3xl p-6 md:p-8">
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/40">Source type</label>
            <div className="flex gap-2">
              {(["webpage", "api"] as const).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setSourceType(type)}
                  className={`liquid-glass rounded-full px-4 py-2 text-sm transition-colors ${
                    sourceType === type ? "text-white" : "text-white/40"
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
              placeholder="https://example.com/jobs"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="liquid-glass w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/40">Condition to watch for</label>
            <textarea
              required
              rows={3}
              placeholder="e.g. a new job posting appears on this page"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="liquid-glass w-full resize-none rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-white/60">
            <input
              type="checkbox"
              checked={notifyByEmail}
              onChange={(e) => setNotifyByEmail(e.target.checked)}
              className="accent-white/70"
            />
            Email me when the condition is met
          </label>

          {error && <p className="text-sm text-white/90">Error: {error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="liquid-glass-strong w-full rounded-full py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create monitor"}
          </button>
        </form>
      </div>
    </div>
  );
} 