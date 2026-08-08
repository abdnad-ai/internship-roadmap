 "use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api, setTokens } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.login(email, password);
      setTokens(data.access_token, data.refresh_token);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="liquid-glass w-full max-w-md rounded-2xl bg-white/[0.02] p-8 md:p-10">
        <div className="mb-8 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
          <span className="text-sm font-medium tracking-wide text-white/65">watchpost</span>
        </div>

        <h1 className="text-4xl font-medium tracking-[-1.5px] text-white">
          Welcome{" "}
          <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-white/80">back</span>
        </h1>
        <p className="mt-3 text-sm text-white/65">Sign in to keep watching where you left off.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/40">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/40">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40"
            />
          </div>

          {error && <p className="text-sm text-[#F87171]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-white py-3 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/65">
          No account?{" "}
          <Link href="/register" className="text-white hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
} 