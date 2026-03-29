import React, { useState } from "react";
import API, { getApiErrorMessage } from "../api";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setMsg({
        type: "error",
        text: getApiErrorMessage(err, "Login failed. Check your details."),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-md flex-col justify-center px-4 py-12">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-soft">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Sign in to manage your todos.
          </p>

          {msg.text && (
            <div
              role="alert"
              className={`mt-6 rounded-xl px-4 py-3 text-sm ${
                msg.type === "error"
                  ? "bg-red-50 text-red-800"
                  : "bg-emerald-50 text-emerald-800"
              }`}
            >
              {msg.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={inputClass}
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className={inputClass}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            No account?{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
