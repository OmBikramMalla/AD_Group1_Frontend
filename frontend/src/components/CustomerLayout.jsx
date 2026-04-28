import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  User,
  Calendar,
  Star,
  History,
  Bell,
  LogOut,
  Menu,
  X,
  Car,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/customer/dashboard",     label: "Dashboard",     icon: LayoutDashboard },
  { to: "/customer/profile",       label: "My Profile",    icon: User },
  { to: "/customer/appointments",  label: "Appointments",  icon: Calendar },
  { to: "/customer/review",        label: "Submit Review", icon: Star },
  { to: "/customer/history",       label: "History Logs",  icon: History },
  { to: "/customer/notifications", label: "Notifications", icon: Bell },
];

export default function CustomerLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">

      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ══════════════════════════════════════════
          SIDEBAR
      ══════════════════════════════════════════ */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          flex flex-col w-64 bg-slate-900 text-white
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700/60">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Car size={20} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-sm leading-tight">AutoLogistics</p>
            <p className="text-xs text-slate-400">Customer Portal</p>
          </div>
          {/* Close btn – mobile only */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden text-slate-400 hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* User pill */}
        <div className="mx-4 mt-4 px-4 py-3 bg-slate-800 rounded-xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-sm flex-shrink-0">
            {(user?.name ?? "C")[0].toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">{user?.name ?? "Customer"}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email ?? ""}</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 mt-5 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-700/60">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-rose-600/10 hover:text-rose-400 transition-all duration-150"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ══════════════════════════════════════════
          MAIN CONTENT AREA
      ══════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar – mobile only */}
        <div className="lg:hidden flex items-center gap-4 px-4 py-3 bg-white border-b border-slate-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-600 hover:text-slate-900 transition"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Car size={14} className="text-white" />
            </div>
            <span className="font-bold text-slate-800 text-sm">AutoLogistics</span>
          </div>
        </div>

        {/* Page outlet */}
        <main className="flex-1 overflow-y-auto flex flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
