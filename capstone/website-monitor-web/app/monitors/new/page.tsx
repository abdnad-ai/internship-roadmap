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
        <Link href="/dashboard" className="text-sm text-white/65 hover:text-white">
          Back
        </Link>

        <h1 className="mt-6 text-4xl font-medium tracking-[-1.5px] text-white">
          New{" "}
          <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-white/80">monitor</span>
        </h1>
        <p className="mt-3 mb-8 text-sm text-white/65">Describe what you are waiting for, in plain English.</p>

        <form onSubmit={handleSubmit} className="liquid-glass space-y-5 rounded-2xl bg-white/[0.02] p-6 md:p-8">
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/40">Source type</label>
            <div className="flex gap-2">
              {(["webpage", "api"] as const).map((type) => (
                <button
                  type="button"
                  key={type}
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
              placeholder="https://example.com/jobs"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40"
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
              className="w-full resize-none rounded-lg border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-white/65">
            <input
              type="checkbox"
              checked={notifyByEmail}
              onChange={(e) => setNotifyByEmail(e.target.checked)}
              className="accent-white"
            />
            Email me when the condition is met
          </label>

          {error && <p className="text-sm text-[#F87171]">Error: {error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-white py-3 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create monitor"}
          </button>
        </form>
      </div>
    </div>
  );
} 