"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api, clearToken, getToken, type Monitor, type MonitorNotification } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [notifications, setNotifications] = useState<MonitorNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checkingId, setCheckingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const [monitorData, notificationData] = await Promise.all([api.getMonitors(), api.getNotifications()]);
      setMonitors(monitorData);
      setNotifications(notificationData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load monitors");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }
    const timeout = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timeout);
  }, [load, router]);

  async function handleCheckNow(id: string) {
    setCheckingId(id);
    try {
      await api.checkMonitor(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Check failed");
    } finally {
      setCheckingId(null);
    }
  }

  async function handleTogglePause(monitor: Monitor) {
    const nextStatus = monitor.status === "active" ? "paused" : "active";
    await api.updateMonitor(monitor.id, { status: nextStatus });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this monitor? This cannot be undone.")) return;
    await api.deleteMonitor(id);
    load();
  }

  async function handleLogout() {
    try {
      await api.logout();
    } catch {
      // Local token removal still protects this browser if the request fails.
    }
    clearToken();
    router.push("/login");
  }

  async function handleMarkRead(id: string) {
    try {
      await api.markNotificationRead(id);
      setNotifications((items) => items.map((item) => (item.id === id ? { ...item, read: true } : item)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update notification");
    }
  }

  async function handleMarkAllRead() {
    try {
      await api.markAllNotificationsRead();
      setNotifications((items) => items.map((item) => ({ ...item, read: true })));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update notifications");
    }
  }

  const unreadCount = notifications.filter((item) => !item.read).length;

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#E7EAF0]">
      <header className="border-b border-[#232A3D] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623] animate-pulse" />
          <span className="font-mono text-sm tracking-wide text-[#8A93A6]">watchpost</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/monitors/new"
            className="rounded-md bg-[#F5A623] text-[#0B0E14] font-medium text-sm px-4 py-2 hover:bg-[#f0ad3d] transition-colors"
          >
            + New monitor
          </Link>
          <button onClick={handleLogout} className="text-sm text-[#8A93A6] hover:text-[#E7EAF0] px-2">
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-xl font-semibold tracking-tight mb-1">Your monitors</h1>
        <p className="text-sm text-[#8A93A6] mb-8">Watching the web so you do not have to.</p>

        {notifications.length > 0 && (
          <section className="rounded-lg border border-[#232A3D] bg-[#131826] mb-8 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#232A3D]">
              <h2 className="text-xs font-mono uppercase tracking-wide text-[#8A93A6]">Alerts</h2>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-[#F5A623]">{unreadCount} unread</span>
                {unreadCount > 0 && (
                  <button
                    onClick={() => void handleMarkAllRead()}
                    className="text-xs text-[#8A93A6] hover:text-[#E7EAF0] hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>
            </div>
            <div className="divide-y divide-[#232A3D]">
              {notifications.slice(0, 5).map((notification) => (
                <div key={notification.id} className={`px-5 py-3 text-sm ${notification.read ? "text-[#8A93A6]" : "text-[#E7EAF0]"}`}>
                  <div className="flex items-start justify-between gap-4">
                    <Link href={`/monitors/${notification.monitor.id}`} className="hover:text-[#F5A623]">
                      <p>{notification.message}</p>
                      <p className="font-mono text-xs text-[#8A93A6] mt-1">{new Date(notification.createdAt).toLocaleString()}</p>
                    </Link>
                    {!notification.read && <button onClick={() => void handleMarkRead(notification.id)} className="text-xs text-[#F5A623] hover:underline shrink-0">Mark read</button>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {error && (
          <div className="rounded-md border border-[#F87171]/30 bg-[#F87171]/10 text-[#F87171] text-sm px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-[#8A93A6] font-mono">Loading monitors…</p>
        ) : monitors.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#232A3D] px-6 py-12 text-center">
            <p className="text-[#E7EAF0] font-medium mb-1">Nothing being watched yet</p>
            <p className="text-sm text-[#8A93A6] mb-5">Add a URL and describe what you are waiting for.</p>
            <Link
              href="/monitors/new"
              className="inline-block rounded-md bg-[#F5A623] text-[#0B0E14] font-medium text-sm px-4 py-2 hover:bg-[#f0ad3d] transition-colors"
            >
              Create your first monitor
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {monitors.map((monitor) => (
              <div key={monitor.id} className="rounded-lg border border-[#232A3D] bg-[#131826] px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <Link href={`/monitors/${monitor.id}`} className="flex-1 min-w-0 group">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          monitor.status === "active" ? "bg-[#F5A623] animate-pulse" : "bg-[#8A93A6]"
                        }`}
                      />
                      <span className="text-xs font-mono text-[#8A93A6] uppercase">{monitor.sourceType}</span>
                      <span className="text-xs font-mono text-[#8A93A6]">{monitor.status}</span>
                    </div>
                    <p className="text-sm font-mono text-[#E7EAF0] truncate group-hover:text-[#F5A623] transition-colors">
                      {monitor.url}
                    </p>
                    <p className="text-sm text-[#8A93A6] mt-1">{monitor.condition}</p>
                  </Link>
                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => handleCheckNow(monitor.id)}
                      disabled={checkingId === monitor.id}
                      className="rounded-md border border-[#232A3D] text-xs font-medium px-3 py-1.5 hover:border-[#F5A623] hover:text-[#F5A623] transition-colors disabled:opacity-50"
                    >
                      {checkingId === monitor.id ? "Checking…" : "Check now"}
                    </button>
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => handleTogglePause(monitor)} className="text-xs text-[#8A93A6] hover:text-[#E7EAF0]">
                        {monitor.status === "active" ? "Pause" : "Resume"}
                      </button>
                      <button onClick={() => handleDelete(monitor.id)} className="text-xs text-[#8A93A6] hover:text-[#F87171]">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
