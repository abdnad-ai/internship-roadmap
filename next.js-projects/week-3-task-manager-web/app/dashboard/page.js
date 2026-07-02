"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, clearTokens, getAccessToken } from "../lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [users, setUsers] = useState([]);
  const [usersError, setUsersError] = useState("");

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
      if (data.role === "ADMIN") {
        loadAllUsers();
      }
    } catch (err) {
      setStatus("error");
    }
  }

  async function loadAllUsers() {
    try {
      const res = await apiFetch("/auth/users");
      if (!res.ok) {
        setUsersError("Could not load users");
        return;
      }
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setUsersError("Could not load users");
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

      <section className="mx-auto max-w-4xl px-8 py-16">
        <p className="text-sm uppercase tracking-wide text-violet-400">Dashboard</p>
        <h1 className="mt-2 text-4xl font-bold text-white">Welcome back</h1>
        <p className="mt-3 text-slate-400">You are signed in as</p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-lg font-bold text-white">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-white">{user.email}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm text-slate-400">User ID: {user.id}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    user.role === "ADMIN"
                      ? "bg-amber-500/20 text-amber-300"
                      : "bg-slate-500/20 text-slate-300"
                  }`}
                >
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {user.role === "ADMIN" && (
          <div className="mt-10">
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white">Admin panel</h2>
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300">
                Admin only
              </span>
            </div>
            <p className="mb-6 text-slate-400">All registered users</p>

            {usersError && (
              <p className="mb-4 text-rose-400">{usersError}</p>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              {users.map((u) => (
                <div
                  key={u.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-slate-700 font-bold text-white">
                      {u.email.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">{u.email}</p>
                      <p className="text-xs text-slate-400">ID: {u.id}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        u.role === "ADMIN"
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-slate-500/20 text-slate-300"
                      }`}
                    >
                      {u.role}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {user.role !== "ADMIN" && (
          <p className="mt-8 text-sm text-slate-500">
            You are signed in as a standard user. The admin panel is hidden.
          </p>
        )}
      </section>
    </main>
  );
}