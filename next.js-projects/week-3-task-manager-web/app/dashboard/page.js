"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, clearTokens, getAccessToken } from "../lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace("/login");
      return;
    }
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const res = await apiFetch("/auth/me");
      if (!res.ok) {
        clearTokens();
        router.replace("/login");
        return;
      }
      const data = await res.json();
      setUser(data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  }

  async function handleLogout() {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch (err) {}
    clearTokens();
    router.replace("/login");
  }

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        Loading...
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-rose-400">
        Something went wrong. Please refresh.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950">
      <nav className="flex items-center justify-between border-b border-white/10 px-8 py-5">
        <div className="text-xl font-bold text-white">SkillForge</div>
        <button
          onClick={handleLogout}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
        >
          Log out
        </button>
      </nav>

      <section className="mx-auto max-w-3xl px-8 py-16">
        <p className="text-sm uppercase tracking-wide text-violet-400">Dashboard</p>
        <h1 className="mt-2 text-4xl font-bold text-white">
          Welcome back
        </h1>
        <p className="mt-3 text-slate-400">You are signed in as</p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-lg font-bold text-white">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-white">{user.email}</p>
              <p className="text-sm text-slate-400">User ID: {user.id}</p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          This page is protected. Only signed in users can see it.
        </p>
      </section>
    </main>
  );
}