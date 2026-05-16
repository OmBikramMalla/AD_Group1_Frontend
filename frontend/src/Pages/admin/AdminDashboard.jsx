import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import api from "../../services/api";
import AdminSidebar from "../components/AdminSidebar";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/admin/dashboard");
      setDashboard(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const money = (value) => `Rs. ${Number(value || 0).toFixed(2)}`;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <AdminSidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Admin Dashboard
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Live system overview, financial activity, inventory alerts, and
              staff summary.
            </p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {loading ? (
              <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center text-slate-500">
                <Loader2 size={32} className="animate-spin mx-auto mb-3" />
                Loading dashboard...
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl">
                {error}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <KpiCard
                    title="Total Sales"
                    value={money(dashboard.totalSales)}
                    sub="From sales invoices"
                    icon={<DollarSign size={22} className="text-emerald-500" />}
                    color="bg-emerald-50"
                  />

                  <KpiCard
                    title="Net Profit"
                    value={money(dashboard.netProfit)}
                    sub="Sales minus purchases"
                    icon={<TrendingUp size={22} className="text-indigo-500" />}
                    color="bg-indigo-50"
                  />

                  <KpiCard
                    title="Low Stock Alerts"
                    value={dashboard.lowStockCount}
                    sub="Parts below 10 units"
                    icon={<AlertTriangle size={22} className="text-rose-500" />}
                    color="bg-rose-50"
                  />

                  <KpiCard
                    title="Active Staff"
                    value={dashboard.activeStaffCount}
                    sub="Registered staff users"
                    icon={<CheckCircle size={22} className="text-teal-500" />}
                    color="bg-teal-50"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-700 mb-4">
                    Quick Access
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    <QuickLink
                      to="/admin/staff"
                      icon={<Users size={22} />}
                      label="Staff"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <div className="flex justify-between items-center mb-5">
                      <h3 className="text-lg font-bold text-slate-800">
                        Sales vs Purchases
                      </h3>
                    </div>

                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dashboard.financialChart || []}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="label" />
                          <YAxis />
                          <Tooltip formatter={(value) => money(value)} />
                          <Legend />
                          <Bar dataKey="sales" name="Sales" />
                          <Bar dataKey="purchases" name="Purchases" />
                          <Bar dataKey="profit" name="Profit" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-5">
                      Low Stock Parts
                    </h3>

                    <div className="space-y-3">
                      {(dashboard.lowStockParts || []).length === 0 ? (
                        <p className="text-sm text-slate-500">
                          No low-stock parts currently.
                        </p>
                      ) : (
                        dashboard.lowStockParts.map((part) => (
                          <div
                            key={part.id}
                            className="flex items-center justify-between bg-rose-50 border border-rose-100 rounded-xl px-4 py-3"
                          >
                            <div>
                              <p className="text-sm font-bold text-slate-800">
                                {part.partName}
                              </p>
                              <p className="text-xs text-slate-500">
                                ID: {part.id}
                              </p>
                            </div>

                            <span className="text-sm font-bold text-rose-600">
                              {part.stockQuantity} left
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="px-6 py-5 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800">
                      Recent Activity
                    </h3>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {(dashboard.recentActivities || []).length === 0 ? (
                      <div className="px-6 py-8 text-center text-slate-500">
                        No recent activities found.
                      </div>
                    ) : (
                      dashboard.recentActivities.map((item, index) => (
                        <div
                          key={index}
                          className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              {item.description}
                            </p>

                            <p className="text-xs text-slate-500 mt-0.5">
                              {item.type} ·{" "}
                              {new Date(item.date).toLocaleString()}
                            </p>
                          </div>

                          <span
                            className={`text-sm font-mono font-bold ${
                              item.type === "Sale"
                                ? "text-emerald-600"
                                : "text-rose-600"
                            }`}
                          >
                            {item.type === "Sale" ? "+" : "-"}
                            {money(item.amount)}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

const KpiCard = ({ title, value, sub, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
    </div>

    <h3 className="text-slate-500 text-sm font-medium mb-1">
      {title}
    </h3>

    <p className="text-3xl font-bold text-slate-800">
      {value}
    </p>

    <p className="text-xs text-slate-500 mt-2">
      {sub}
    </p>
  </div>
);

const QuickLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center gap-3 hover:border-indigo-300 hover:shadow-md transition-all group text-center"
  >
    <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
      {icon}
    </div>

    <span className="text-xs font-bold text-slate-700">
      {label}
    </span>
  </Link>
);

export default AdminDashboard;