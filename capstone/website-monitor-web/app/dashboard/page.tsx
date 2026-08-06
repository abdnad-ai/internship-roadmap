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
    <div className="min-h-screen px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
            <span className="text-sm font-medium tracking-wide text-white/60">watchpost</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/monitors/new"
              className="liquid-glass-strong rounded-full bg-[#F5A623]/15 px-5 py-2.5 text-sm font-medium text-[#F5A623] transition-transform hover:scale-105 active:scale-95"
            >
              + New monitor
            </Link>
            <button onClick={handleLogout} className="text-sm text-white/50 transition-colors hover:text-white">
              Sign out
            </button>
          </div>
        </header>

        <h1 className="text-4xl tracking-[-0.03em] text-white">
          Your{" "}
          <span className="font-[family-name:var(--font-source-serif)] italic text-white/80">monitors</span>
        </h1>
        <p className="mt-2 mb-10 text-sm text-white/50">Watching the web so you do not have to.</p>

        {notifications.length > 0 && (
          <section className="liquid-glass mb-8 overflow-hidden rounded-2xl">
            <div className="flex items-center justify-between px-5 py-3">
              <h2 className="text-xs uppercase tracking-widest text-white/40">Alerts</h2>
              <div className="flex items-center gap-4">
                <span className="text-xs text-white/60">{unreadCount} unread</span>
                {unreadCount > 0 && (
                  <button
                    onClick={() => void handleMarkAllRead()}
                    className="rounded-full bg-[#60A5FA]/15 px-3 py-1 text-xs font-medium text-[#60A5FA] transition-colors hover:bg-[#60A5FA]/25"
                  >
                    Mark all read
                  </button>
                )}
              </div>
            </div>
            <div className="divide-y divide-white/[0.06]">
              {notifications.slice(0, 5).map((notification) => (
                <div key={notification.id} className={`px-5 py-3 text-sm ${notification.read ? "text-white/40" : "text-white/90"}`}>
                  <div className="flex items-start justify-between gap-4">
                    <Link href={`/monitors/${notification.monitor.id}`} className="hover:text-white">
                      <p>{notification.message}</p>
                      <p className="mt-1 text-xs text-white/40">{new Date(notification.createdAt).toLocaleString()}</p>
                    </Link>
                    {!notification.read && (
                      <button
                        onClick={() => void handleMarkRead(notification.id)}
                        className="shrink-0 rounded-full bg-[#60A5FA]/15 px-3 py-1 text-xs font-medium text-[#60A5FA] transition-colors hover:bg-[#60A5FA]/25"
                      >
                        Mark read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {error && (
          <div className="liquid-glass mb-6 rounded-xl px-4 py-3 text-sm text-[#F87171]">
            Error: {error}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-white/50">Loading monitors...</p>
        ) : monitors.length === 0 ? (
          <div className="liquid-glass rounded-2xl px-6 py-12 text-center">
            <p className="mb-1 font-medium text-white">Nothing being watched yet</p>
            <p className="mb-5 text-sm text-white/50">Add a URL and describe what you are waiting for.</p>
            <Link
              href="/monitors/new"
              className="liquid-glass-strong inline-block rounded-full bg-[#F5A623]/15 px-5 py-2.5 text-sm font-medium text-[#F5A623] transition-transform hover:scale-105 active:scale-95"
            >
              Create your first monitor
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {monitors.map((monitor) => (
              <div key={monitor.id} className="liquid-glass rounded-2xl px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <Link href={`/monitors/${monitor.id}`} className="group min-w-0 flex-1">
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${monitor.status === "active" ? "bg-white/70" : "bg-white/20"}`} />
                      <span className="text-xs uppercase text-white/40">{monitor.sourceType}</span>
                      <span className="text-xs text-white/40">{monitor.status}</span>
                    </div>
                    <p className="truncate text-sm text-white transition-colors group-hover:text-white/70">{monitor.url}</p>
                    <p className="mt-1 text-sm text-white/50">{monitor.condition}</p>
                  </Link>
                  <div className="flex shrink-0 flex-col gap-2">
                    <button
                      onClick={() => handleCheckNow(monitor.id)}
                      disabled={checkingId === monitor.id}
                      className="rounded-full bg-[#34D399]/15 px-3 py-1.5 text-xs font-medium text-[#34D399] transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
                    >
                      {checkingId === monitor.id ? "Checking..." : "Check now"}
                    </button>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleTogglePause(monitor)} className="text-xs text-white/50 hover:text-white">
                        {monitor.status === "active" ? "Pause" : "Resume"}
                      </button>
                      <button onClick={() => handleDelete(monitor.id)} className="text-xs text-[#F87171]/80 hover:text-[#F87171]">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}