"use client";

import { useEffect, useState } from "react";

const API_URL = "http://localhost:3001/tasks";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Day 4 controls
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  async function loadTasks() {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (filter === "done") params.set("completed", "true");
      if (filter === "todo") params.set("completed", "false");
      params.set("sort", sort);
      params.set("order", order);
      params.set("page", page);
      params.set("limit", limit);

      const res = await fetch(`${API_URL}?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load tasks");
      const result = await res.json();
      setTasks(result.data);
      setTotal(result.total);
      setLastPage(result.lastPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, [search, filter, sort, order, page]);

  async function handleCreate(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error("Failed to create task");
      setTitle("");
      setDescription("");
      setPage(1);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(task) {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  }

  async function handleUpdate(id) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle, description: editDescription }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      setEditingId(null);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggleComplete(task) {
    try {
      const res = await fetch(`${API_URL}/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete task");
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-900 via-neutral-900 to-amber-950">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-orange-600">
          📝 My Tasks
        </h1>

        <form
          onSubmit={handleCreate}
          className="mb-6 rounded-3xl bg-stone-800 p-5 shadow-lg shadow-black/30"
        >
          <input
            type="text"
            placeholder="What needs doing?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-3 w-full rounded-2xl border border-orange-700 bg-transparent px-4 py-3 text-white outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-300"
          />
          <input
            type="text"
            placeholder="Add a few details (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-3 w-full rounded-2xl border border-orange-700 bg-transparent px-4 py-3 text-white outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-300"
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 font-semibold text-white shadow-md transition hover:scale-105 active:scale-95 hover:shadow-lg disabled:opacity-60"
          >
            {submitting ? "Adding..." : "Add task ✨"}
          </button>
        </form>

        {/* Controls */}
        <div className="mb-6 rounded-3xl bg-stone-800 p-4 shadow-lg shadow-black/30">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="mb-3 w-full rounded-2xl border border-orange-700 bg-transparent px-4 py-2 text-white outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-300"
          />
          <div className="flex flex-wrap gap-3">
            <select
              value={filter}
              onChange={(e) => {
                setPage(1);
                setFilter(e.target.value);
              }}
              className="rounded-xl bg-stone-700 px-3 py-2 text-sm text-white outline-none"
            >
              <option value="all">All</option>
              <option value="done">Done</option>
              <option value="todo">To do</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl bg-stone-700 px-3 py-2 text-sm text-white outline-none"
            >
              <option value="createdAt">Date</option>
              <option value="title">Title</option>
              <option value="completed">Status</option>
            </select>

            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="rounded-xl bg-stone-700 px-3 py-2 text-sm text-white outline-none"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>

        {loading && <p className="text-center text-orange-500">Loading your tasks...</p>}

        {error && !loading && (
          <div className="rounded-2xl bg-rose-50 p-4 text-center">
            <p className="mb-2 text-rose-600">{error}</p>
            <button
              onClick={loadTasks}
              className="rounded-xl bg-rose-500 px-4 py-2 font-medium text-white"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && tasks.length === 0 && (
          <div className="rounded-3xl bg-stone-800 p-10 text-center shadow-md">
            <p className="text-5xl">🔍</p>
            <p className="mt-3 text-lg font-medium text-gray-400">
              {search || filter !== "all"
                ? "No tasks match your search or filter."
                : "No tasks yet. Add your first one above!"}
            </p>
          </div>
        )}

        {!loading && !error && tasks.length > 0 && (
          <>
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`rounded-3xl border-l-8 bg-stone-800 p-5 shadow-md transition-all duration-300 ${
                    task.completed ? "border-green-400" : "border-orange-400"
                  }`}
                >
                  {editingId === task.id ? (
                    <div>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="mb-3 w-full rounded-2xl border border-orange-200 px-4 py-2 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                      />
                      <input
                        type="text"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="mb-3 w-full rounded-2xl border border-orange-200 px-4 py-2 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                      />
                      <button
                        onClick={() => handleUpdate(task.id)}
                        className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 font-medium text-white"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="ml-2 rounded-xl bg-gray-100 px-4 py-2 font-medium text-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3
                          className={`text-lg font-bold ${
                            task.completed ? "text-gray-400" : "text-gray-100"
                          }`}
                        >
                          {task.title}
                        </h3>
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                            task.completed
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {task.completed ? "Done 🎉" : "To do"}
                        </span>
                      </div>
                      {task.description && (
                        <p className="mt-1 text-gray-400">{task.description}</p>
                      )}
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => toggleComplete(task)}
                          className="rounded-full bg-orange-100 px-4 py-1.5 text-sm font-medium text-orange-700 transition active:scale-95 hover:bg-orange-200"
                        >
                          {task.completed ? "Mark not done" : "Mark done"}
                        </button>
                        <button
                          onClick={() => startEdit(task)}
                          className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-600 transition active:scale-95 hover:bg-gray-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="rounded-full bg-rose-100 px-4 py-1.5 text-sm font-medium text-rose-700 transition active:scale-95 hover:bg-rose-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="rounded-xl bg-stone-700 px-4 py-2 text-sm font-medium text-white transition active:scale-95 disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-gray-400">
                Page {page} of {lastPage} ({total} tasks)
              </span>
              <button
                onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
                disabled={page >= lastPage}
                className="rounded-xl bg-stone-700 px-4 py-2 text-sm font-medium text-white transition active:scale-95 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
} 