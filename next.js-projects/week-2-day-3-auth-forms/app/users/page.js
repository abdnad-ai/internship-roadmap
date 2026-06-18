"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("http://localhost:3001/users");
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();
        setUsers(data);
        setStatus("success");
      } catch (err) {
        setStatus("error");
      }
    }
    fetchUsers();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 font-bold text-slate-950">
            S
          </div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
        </div>

        {status === "loading" && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
            Loading users...
          </div>
        )}

        {status === "error" && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center text-red-400">
            Could not load users. Make sure the backend is running on port 3001.
          </div>
        )}

        {status === "success" && users.length === 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
            No users found.
          </div>
        )}

        {status === "success" && users.length > 0 && (
          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <div>
                  <p className="font-semibold text-white">{user.name}</p>
                  <p className="text-sm text-slate-400">{user.email}</p>
                </div>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
                  ID {user.id}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}