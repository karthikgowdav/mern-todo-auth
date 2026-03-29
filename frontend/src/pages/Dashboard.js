import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const fetchTodos = async () => {
    setErr("");
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch {
      setErr("Could not load todos. Try refreshing.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    try {
      const res = await API.post("/todos", { text: trimmed });
      setTodos([...todos, res.data]);
      setText("");
    } catch {
      setErr("Could not add todo.");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
    } catch {
      setErr("Could not delete todo.");
    }
  };

  const toggleTodo = async (id) => {
    try {
      const res = await API.put(`/todos/${id}`);
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
    } catch {
      setErr("Could not update todo.");
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTodo();
    }
  };

  const doneCount = todos.filter((t) => t.completed).length;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Your todos
          </h1>
          <p className="mt-1 text-slate-500">
            {todos.length === 0
              ? "Add something to get started."
              : `${doneCount} of ${todos.length} completed`}
          </p>
        </div>

        {err && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {err}
          </div>
        )}

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft">
          <div className="font-medium text-slate-700">New task</div>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="What needs doing?"
              className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
            />
            <button
              type="button"
              onClick={addTodo}
              className="shrink-0 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
            >
              Add
            </button>
          </div>
        </div>

        <ul className="mt-6 space-y-2">
          {loading ? (
            <li className="rounded-xl border border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500 shadow-sm">
              Loading…
            </li>
          ) : todos.length === 0 ? (
            <li className="rounded-xl border border-dashed border-slate-200 bg-white/60 px-4 py-12 text-center text-sm text-slate-500">
              No todos yet. Add one above.
            </li>
          ) : (
            todos.map((todo) => (
              <li
                key={todo._id}
                className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-slate-300"
              >
                <button
                  type="button"
                  onClick={() => toggleTodo(todo._id)}
                  aria-label={todo.completed ? "Mark incomplete" : "Mark done"}
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
                    todo.completed
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-300 hover:border-indigo-400"
                  }`}
                >
                  {todo.completed && (
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
                <button
                  type="button"
                  className={`min-w-0 flex-1 cursor-pointer rounded-lg px-0.5 text-left text-slate-800 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
                    todo.completed
                      ? "text-slate-400 line-through"
                      : ""
                  }`}
                  onClick={() => toggleTodo(todo._id)}
                >
                  {todo.text}
                </button>
                <button
                  type="button"
                  onClick={() => deleteTodo(todo._id)}
                  className="rounded-lg p-2 text-slate-400 opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
                  aria-label="Delete todo"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </li>
            ))
          )}
        </ul>
      </main>
    </>
  );
}

export default Dashboard;
