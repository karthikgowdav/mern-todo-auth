import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const linkBtn =
    "rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-slate-100";
  const isLogin = location.pathname === "/";
  const isRegister = location.pathname === "/register";

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <button
          type="button"
          onClick={() => navigate(token ? "/dashboard" : "/")}
          className="text-lg font-semibold tracking-tight text-slate-900 transition hover:text-indigo-600"
        >
          Todo
          <span className="text-indigo-600">.</span>
        </button>

        <nav className="flex items-center gap-2">
          {!token ? (
            <>
              <button
                type="button"
                onClick={() => navigate("/")}
                className={`${linkBtn} ${
                  isLogin
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className={`${linkBtn} ${
                  isRegister
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Register
              </button>
            </>
          ) : (
            <>
              <span className="hidden text-sm text-slate-500 sm:inline">
                Signed in
              </span>
              <button
                type="button"
                onClick={logout}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-soft transition hover:bg-slate-800"
              >
                Log out
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
