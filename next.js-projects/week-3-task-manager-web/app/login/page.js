"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveTokens } from "../lib/api";
import AuthSidePanel from "../components/AuthSidePanel";

const API_BASE = "http://localhost:3001";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          Array.isArray(data.message) ? data.message[0] : data.message || "Login failed"
        );
      }
      saveTokens(data);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen">
      <AuthSidePanel />

      <div className="flex w-full items-center justify-center bg-slate-950 p-8 lg:w-1/2">
        <div className="w-full max-w-sm">
          <h1 className="mb-2 text-3xl font-bold text-white">Welcome back</h1>
          <p className="mb-8 text-slate-400">Sign in to your account</p>

          {error && (
            <div className="mb-4 rounded-xl border border-rose-800 bg-rose-950/50 px-4 py-3 text-sm text-rose-300">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 font-semibold text-white transition hover:opacity-90 active:scale-[0.99] disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link href="/register" className="font-medium text-violet-400 hover:text-violet-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}