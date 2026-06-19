"use client";

import { useEffect, useState } from "react";

const API = "http://localhost:3001/users";

export default function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("loading");
  const [view, setView] = useState("dashboard");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  async function loadUsers() {
    setStatus("loading");
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setUsers(data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleAddUser(e) {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Validation failed");
      setForm({ name: "", email: "", password: "" });
      await loadUsers();
    } catch (err) {
      setFormError("Could not add user. Name min 2, valid email, password min 6.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRemove(id) {
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await loadUsers();
    } catch (err) {
      setStatus("error");
    }
  }

  const label = "mb-1.5 block text-xs font-medium text-slate-400";
  const input =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-400/60 focus:bg-white/10";

  function navItem(key, text) {
    const active = view === key;
    return (
      <button
        onClick={() => setView(key)}
        className={`transition ${active ? "text-white" : "text-slate-400 hover:text-white"}`}
      >
        {text}
      </button>
    );
  }

  function usersList() {
    if (status === "loading")
      return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-400 backdrop-blur">
          Loading users...
        </div>
      );
    if (status === "error")
      return (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center text-red-400">
          Could not load users. Make sure the backend is running on port 3001.
        </div>
      );
    if (users.length === 0)
      return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-400 backdrop-blur">
          No users yet. Add one above.
        </div>
      );
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-white/20"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-violet-500 text-sm font-bold text-slate-950">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-white">{user.name}</p>
                <p className="text-sm text-slate-400">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                ID {user.id}
              </span>
              <button
                onClick={() => handleRemove(user.id)}
                className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05060f]">
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-blue-600/25 blur-[120px]" />
      <div className="pointer-events-none absolute -top-32 right-1/4 h-[30rem] w-[30rem] translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(59,130,246,0.12),transparent_60%)]" />

      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-violet-500 text-sm font-bold text-slate-950">
            S
          </div>
          <span className="font-semibold tracking-tight text-white">SkillForge</span>
        </div>
        <div className="hidden items-center gap-8 text-sm md:flex">
          {navItem("dashboard", "Dashboard")}
          {navItem("users", "Users")}
          {navItem("settings", "Settings")}
        </div>
        <button
          onClick={loadUsers}
          className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
        >
          Refresh
        </button>
      </nav>

      {view === "dashboard" && (
        <>
          <section className="relative mx-auto grid max-w-6xl gap-10 px-6 pb-6 pt-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                User Management
              </span>
              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                Manage your users in one place.
              </h1>
              <p className="mt-4 max-w-md text-slate-400">
                View everyone in the system, add new users, and remove them. Each entry
                is validated by the backend before it is saved.
              </p>

              <div className="mt-8 grid max-w-md grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <p className="text-sm text-slate-400">Total Users</p>
                  <p className="mt-1 text-3xl font-bold text-white">
                    {status === "success" ? users.length : "-"}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <p className="text-sm text-slate-400">Status</p>
                  <p className="mt-1 text-lg font-semibold capitalize text-blue-400">
                    {status}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
              <h2 className="text-lg font-semibold text-white">Add a new user</h2>
              <p className="mt-1 text-sm text-slate-400">
                Fill the details below and submit to create a user.
              </p>
              <form onSubmit={handleAddUser} className="mt-6 space-y-4">
                <div>
                  <label className={label}>Full Name</label>
                  <input
                    type="text"
                    placeholder="Ilia Toporia"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={input}
                  />
                </div>
                <div>
                  <label className={label}>Email</label>
                  <input
                    type="email"
                    placeholder="toporia@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={input}
                  />
                </div>
                <div>
                  <label className={label}>Password</label>
                  <input
                    type="password"
                    placeholder="At least 6 characters"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className={input}
                  />
                </div>
                {formError && <p className="text-sm text-red-400">{formError}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                >
                  {submitting ? "Adding..." : "Send Request"}
                </button>
              </form>
            </div>
          </section>

          <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-6">
            <h2 className="mb-5 text-lg font-semibold text-white">All Users</h2>
            {usersList()}
          </section>
        </>
      )}

      {view === "users" && (
        <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Users</h2>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-400">
              {status === "success" ? users.length : "-"} total
            </span>
          </div>
          {usersList()}
        </section>
      )}

      {view === "settings" && (
        <section className="relative mx-auto max-w-3xl px-6 pb-20 pt-6">
          <h2 className="mb-5 text-2xl font-semibold text-white">Settings</h2>
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-sm text-slate-400">API Endpoint</p>
              <p className="mt-1 font-mono text-sm text-blue-400">{API}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-sm text-slate-400">Connection Status</p>
                <p className="mt-1 text-lg font-semibold capitalize text-white">{status}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-sm text-slate-400">Total Users</p>
                <p className="mt-1 text-lg font-semibold text-white">{users.length}</p>
              </div>
            </div>
            <button
              onClick={loadUsers}
              className="rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Reload Users
            </button>
            <p className="text-xs text-slate-500">
              User data is stored in memory on the backend and resets when the server restarts.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}