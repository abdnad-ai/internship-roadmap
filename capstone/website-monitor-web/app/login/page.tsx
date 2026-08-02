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
    <div className="min-h-screen flex items-center justify-center bg-[#0B0E14] px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623] animate-pulse" />
          <span className="font-mono text-sm tracking-wide text-[#8A93A6]">watchpost</span>
        </div>
        <h1 className="text-2xl font-semibold text-[#E7EAF0] mb-1 tracking-tight">Sign in</h1>
        <p className="text-sm text-[#8A93A6] mb-6">Keep watching where you left off.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-[#8A93A6] mb-1.5">EMAIL</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md bg-[#131826] border border-[#232A3D] px-3 py-2 text-[#E7EAF0] text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]/50 focus:border-[#F5A623]"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-[#8A93A6] mb-1.5">PASSWORD</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md bg-[#131826] border border-[#232A3D] px-3 py-2 text-[#E7EAF0] text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]/50 focus:border-[#F5A623]"
            />
          </div>
          {error && <p className="text-sm text-[#F87171]">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#F5A623] text-[#0B0E14] font-medium text-sm py-2.5 hover:bg-[#f0ad3d] transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="text-sm text-[#8A93A6] mt-6">
          No account? <Link href="/register" className="text-[#F5A623] hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
