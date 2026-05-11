import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  AlertTriangle,
  LayoutDashboard,
  Package,
  Clock,
  CheckCircle,
  Info,
  BarChart3,
  ShoppingCart,
  Building2,
  Users,
  User,
  Shield,
  Loader2,
  Send,
} from "lucide-react";
import api from "../../services/api";

function AdminNotifications() {
  const location = useLocation();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const unreadCount = notifications.length;

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/admin/notifications");
      setNotifications(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  const sendCreditReminders = async () => {
    try {
      setSending(true);
      setError("");
      setSuccess("");

      const res = await api.post("/admin/notifications/send-credit-reminders");

      setSuccess(res.data.message || "Credit reminders sent successfully.");
      await fetchNotifications();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reminders.");
    } finally {
      setSending(false);
    }
  };

  const getIconForType = (type) => {
    if (type === "low_stock") {
      return <AlertTriangle className="text-rose-500" size={24} />;
    }

    if (type === "overdue_credit") {
      return <Info className="text-amber-500" size={24} />;
    }

    return <Bell className="text-indigo-500" size={24} />;
  };

  const getBgForType = (type) => {
    if (type === "low_stock") return "bg-rose-50/50 border-rose-200";
    if (type === "overdue_credit") return "bg-amber-50/50 border-amber-200";
    return "bg-indigo-50/50 border-indigo-200";
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 shadow-xl z-10">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            AutoLogistics
          </h1>
          <p className="text-sm text-indigo-400 mt-1">Admin Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem to="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" active={location.pathname === "/admin/dashboard"} />
          <NavItem to="/admin/reports" icon={<BarChart3 size={20} />} label="Financial Reports" active={location.pathname === "/admin/reports"} />
          <NavItem to="/admin/parts" icon={<Package size={20} />} label="Parts Inventory" active={location.pathname === "/admin/parts"} />
          <NavItem to="/admin/purchase-invoice" icon={<ShoppingCart size={20} />} label="Purchase Invoices" active={location.pathname === "/admin/purchase-invoice"} />
          <NavItem to="/admin/vendors" icon={<Building2 size={20} />} label="Vendor Management" active={location.pathname === "/admin/vendors"} />
          <NavItem to="/admin/staff" icon={<Users size={20} />} label="Staff Management" active={location.pathname === "/admin/staff"} />
          <NavItem to="/admin/notifications" icon={<Bell size={20} />} label="Notifications" active={location.pathname === "/admin/notifications"} badge={unreadCount} />

          <div className="pt-4 mt-4 border-t border-slate-800">
            <NavItem to="/admin/profile" icon={<User size={20} />} label="Profile" />
            <NavItem to="/admin/staff" icon={<Shield size={20} />} label="Role Management" />
          </div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-slate-800">
              System Notifications
            </h2>

            {unreadCount > 0 && (
              <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold border border-rose-200">
                {unreadCount} Alerts
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={fetchNotifications}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200"
            >
              Refresh
            </button>

            <button
              onClick={sendCreditReminders}
              disabled={sending}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-60"
            >
              <Send size={16} />
              {sending ? "Sending..." : "Send Credit Reminders"}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-4xl mx-auto">
            {success && (
              <div className="mb-5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-3 rounded-xl flex gap-3 items-center">
                <CheckCircle size={20} />
                <span>{success}</span>
              </div>
            )}

            {error && (
              <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl flex gap-3 items-center">
                <AlertTriangle size={20} />
                <span>{error}</span>
              </div>
            )}

            {loading ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
                <Loader2 size={36} className="animate-spin mx-auto mb-3" />
                Loading notifications...
              </div>
            ) : notifications.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                  <Bell size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  All Caught Up!
                </h3>
                <p className="text-slate-500 mt-2">
                  No low stock or overdue credit alerts right now.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`relative p-5 rounded-2xl border shadow-sm flex gap-4 ${getBgForType(
                      notif.type
                    )}`}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1.5 h-12 bg-indigo-500 rounded-r-full" />

                    <div className="flex-shrink-0 mt-1">
                      {getIconForType(notif.type)}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-base font-bold text-slate-900">
                          {notif.title}
                        </h3>

                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5 whitespace-nowrap ml-4">
                          <Clock size={12} /> Auto generated
                        </span>
                      </div>

                      <p className="text-sm leading-relaxed text-slate-700 font-medium">
                        {notif.message}
                      </p>

                      {notif.type === "low_stock" && (
                        <Link
                          to="/admin/purchase-invoice"
                          className="inline-block mt-3 text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 px-3 py-1.5 rounded-lg transition"
                        >
                          Create Purchase Invoice
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

const NavItem = ({ icon, label, active, to, badge }) => (
  <Link
    to={to || "#"}
    className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
      active
        ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="font-medium">{label}</span>
    </div>

    {badge > 0 && (
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-bold ${
          active ? "bg-white text-indigo-600" : "bg-rose-500 text-white"
        }`}
      >
        {badge}
      </span>
    )}
  </Link>
);

export default AdminNotifications;