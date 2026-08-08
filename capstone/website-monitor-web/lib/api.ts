 export interface Monitor {
  id: string;
  url: string;
  sourceType: string;
  condition: string;
  notifyByEmail: boolean;
  status: string;
  createdAt: string;
}

export interface CheckLog {
  id: string;
  checkedAt: string;
  rawContent: string;
  aiVerdict: boolean;
  aiReasoning: string;
}

export interface MonitorDetail extends Monitor {
  checkLogs: CheckLog[];
}

export interface MonitorNotification {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
  monitor: Pick<Monitor, "id" | "url" | "condition">;
}

export interface CheckResult {
  checkLog: CheckLog;
  notification: { id: string; message: string; read: boolean; createdAt: string } | null;
  met: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refresh_token");
}

export function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
}

export function clearToken() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

async function tryRefresh(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;
  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
    if (!res.ok) return false;
    const data = await res.json();
    setTokens(data.access_token, data.refresh_token);
    return true;
  } catch {
    return false;
  }
}

async function apiFetch<T>(path: string, options: RequestInit = {}, isRetry = false): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (res.status === 401 && !isRetry) {
    const refreshed = await tryRefresh();
    if (refreshed) {
      return apiFetch<T>(path, options, true);
    }
    clearToken();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new Error("Session expired, please sign in again");
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = data?.message || "Something went wrong";
    throw new Error(Array.isArray(message) ? message.join(", ") : message);
  }
  return data as T;
}

export const api = {
  register: (email: string, password: string) =>
    apiFetch<{ access_token: string; refresh_token: string }>("/auth/register", { method: "POST", body: JSON.stringify({ email, password }) }),
  login: (email: string, password: string) =>
    apiFetch<{ access_token: string; refresh_token: string }>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  logout: (): Promise<{ message: string }> => apiFetch("/auth/logout", { method: "POST" }),
  getMonitors: (): Promise<Monitor[]> => apiFetch("/monitors"),
  getMonitor: (id: string): Promise<MonitorDetail> => apiFetch(`/monitors/${id}`),
  createMonitor: (data: { url: string; condition: string; sourceType: string; notifyByEmail: boolean }) =>
    apiFetch("/monitors", { method: "POST", body: JSON.stringify(data) }),
  updateMonitor: (id: string, data: Record<string, unknown>) =>
    apiFetch(`/monitors/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteMonitor: (id: string) => apiFetch(`/monitors/${id}`, { method: "DELETE" }),
  checkMonitor: (id: string): Promise<CheckResult> => apiFetch(`/monitors/${id}/check`, { method: "POST" }),
  getNotifications: (): Promise<MonitorNotification[]> => apiFetch("/notifications"),
  markNotificationRead: (id: string): Promise<MonitorNotification | null> =>
    apiFetch(`/notifications/${id}/read`, { method: "PATCH" }),
  markAllNotificationsRead: (): Promise<{ updated: number }> =>
    apiFetch("/notifications/read-all", { method: "PATCH" }),
};
