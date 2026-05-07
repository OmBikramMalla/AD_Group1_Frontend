import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  UserPlus,
  ShoppingCart,
  Settings,
  Users,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import StaffSidebar from "../components/StaffSideBar";

function StaffDashboard() {
  const location = useLocation();

  const API_BASE = "http://localhost:5093/api";

  const [customers, setCustomers] = useState([]);
  const [summary, setSummary] = useState(null);
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [topSpenders, setTopSpenders] = useState([]);
  const [frequentCustomers, setFrequentCustomers] = useState([]);
  const [pendingCredits, setPendingCredits] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getToken = () =>
    localStorage.getItem("token") ||
    localStorage.getItem("jwtToken") ||
    localStorage.getItem("authToken");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${getToken()}`,
      };

      const [
        customersRes,
        summaryRes,
        recentRes,
        topRes,
        frequentRes,
        pendingRes,
      ] = await Promise.all([
        fetch(`${API_BASE}/staff/customers`, { headers }),
        fetch(`${API_BASE}/sales-invoices/summary`, { headers }),
        fetch(`${API_BASE}/sales-invoices/recent`, { headers }),
        fetch(`${API_BASE}/staff/reports/top-spenders`, { headers }),
        fetch(`${API_BASE}/staff/reports/frequent-customers`, { headers }),
        fetch(`${API_BASE}/staff/reports/pending-payments`, { headers }),
      ]);

      const customersData = customersRes.ok ? await customersRes.json() : [];
      const summaryData = summaryRes.ok ? await summaryRes.json() : null;
      const recentData = recentRes.ok ? await recentRes.json() : [];
      const topData = topRes.ok ? await topRes.json() : [];
      const frequentData = frequentRes.ok ? await frequentRes.json() : [];
      const pendingData = pendingRes.ok ? await pendingRes.json() : [];

      setCustomers(Array.isArray(customersData) ? customersData : []);
      setSummary(summaryData);
      setRecentInvoices(Array.isArray(recentData) ? recentData : []);
      setTopSpenders(Array.isArray(topData) ? topData : []);
      setFrequentCustomers(Array.isArray(frequentData) ? frequentData : []);
      setPendingCredits(Array.isArray(pendingData) ? pendingData : []);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const money = (amount) => `Rs. ${Number(amount || 0).toFixed(2)}`;

  const completedInvoices =
    Number(summary?.totalInvoices || 0) - Number(summary?.pendingInvoices || 0);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Staff Sidebar */}
      <StaffSidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Staff Dashboard
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Real-time overview of customer, sales, and report activity.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-700">
                Staff Member
              </p>
              <p className="text-xs text-slate-500">Service Dept</p>
            </div>
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">
              SM
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {loading && (
              <div className="bg-white border border-slate-200 rounded-2xl p-4 text-sm text-slate-500">
                Loading dashboard data...
              </div>
            )}

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <KpiCard
                title="Today's Sales"
                value={money(summary?.todaySales)}
                sub={`${summary?.todayTransactions || 0} transaction(s) today`}
                icon={<TrendingUp size={22} className="text-indigo-500" />}
                color="bg-indigo-50"
              />

              <KpiCard
                title="Total Customers"
                value={customers.length}
                sub="Registered customers"
                icon={<Users size={22} className="text-emerald-500" />}
                color="bg-emerald-50"
              />

              <KpiCard
                title="Pending Invoices"
                value={summary?.pendingInvoices || 0}
                sub={`${money(summary?.totalPendingAmount)} due`}
                icon={<Clock size={22} className="text-amber-500" />}
                color="bg-amber-50"
              />

              <KpiCard
                title="Completed Invoices"
                value={completedInvoices}
                sub={`${summary?.totalInvoices || 0} total invoices`}
                icon={<CheckCircle size={22} className="text-teal-500" />}
                color="bg-teal-50"
              />
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-bold text-slate-700 mb-4">
                Quick Actions
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <QuickAction
                  to="/staff/customers"
                  icon={<Search size={22} />}
                  label="Search Customer"
                  color="indigo"
                />

                <QuickAction
                  to="/staff/register"
                  icon={<UserPlus size={22} />}
                  label="Register Customer"
                  color="emerald"
                />

                <QuickAction
                  to="/staff/sales"
                  icon={<ShoppingCart size={22} />}
                  label="New Sale"
                  color="indigo"
                />

                <QuickAction
                  to="/staff/reports"
                  icon={<FileText size={22} />}
                  label="View Reports"
                  color="rose"
                />
              </div>
            </div>

            {/* Report Snapshot */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MiniReportCard
                title="High Spenders"
                value={topSpenders.length}
                sub="Customers ranked by paid amount"
                icon={<TrendingUp size={20} className="text-indigo-500" />}
                to="/staff/reports"
              />

              <MiniReportCard
                title="Regular Customers"
                value={frequentCustomers.length}
                sub="Customers ranked by appointments"
                icon={<Users size={20} className="text-emerald-500" />}
                to="/staff/reports"
              />

              <MiniReportCard
                title="Pending Credits"
                value={pendingCredits.length}
                sub="Customers with unpaid balances"
                icon={<AlertCircle size={20} className="text-rose-500" />}
                to="/staff/reports"
              />
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    Recent Sales Invoices
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Latest created sales invoices from staff sales.
                  </p>
                </div>

                <Link
                  to="/staff/sales"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  New Sale →
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">
                        Invoice
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">
                        Total
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">
                        Due
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-bold text-slate-500 uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {recentInvoices.length > 0 ? (
                      recentInvoices.map((invoice) => (
                        <tr
                          key={invoice.id}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm font-mono font-bold text-indigo-600">
                            INV-{invoice.id}
                          </td>

                          <td className="px-6 py-4 text-sm font-medium text-slate-800">
                            {invoice.customerName || "Unknown"}
                          </td>

                          <td className="px-6 py-4 text-sm text-slate-500">
                            {invoice.invoiceDate
                              ? new Date(invoice.invoiceDate).toLocaleDateString()
                              : "N/A"}
                          </td>

                          <td className="px-6 py-4 text-sm font-mono font-bold text-slate-900 text-right">
                            {money(invoice.totalAmount)}
                          </td>

                          <td className="px-6 py-4 text-sm font-mono font-bold text-rose-600 text-right">
                            {money(invoice.dueAmount)}
                          </td>

                          <td className="px-6 py-4 text-center">
                            <span
                              className={`px-2.5 py-1 inline-flex text-xs font-bold rounded-full ${
                                invoice.status === "Completed"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-rose-100 text-rose-700"
                              }`}
                            >
                              {invoice.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="px-6 py-10 text-center text-slate-500"
                        >
                          No recent invoices found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const KpiCard = ({ title, value, sub, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
    <div className={`p-3 rounded-xl ${color} flex-shrink-0`}>{icon}</div>
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="text-2xl font-bold text-slate-800 tracking-tight">
        {value}
      </p>
      <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
    </div>
  </div>
);

const QuickAction = ({ to, icon, label, color }) => {
  const colorClass = {
    indigo:
      "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white hover:border-indigo-400",
    emerald:
      "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white hover:border-emerald-400",
    rose:
      "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white hover:border-rose-400",
  };

  return (
    <Link
      to={to}
      className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center gap-3 hover:shadow-md transition-all group text-center"
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${colorClass[color]}`}
      >
        {icon}
      </div>
      <span className="text-sm font-bold text-slate-700">{label}</span>
    </Link>
  );
};

const MiniReportCard = ({ title, value, sub, icon, to }) => (
  <Link
    to={to}
    className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-200 transition flex items-center gap-4"
  >
    <div className="w-11 h-11 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      <p className="text-xs text-slate-400">{sub}</p>
    </div>
  </Link>
);

const NavItem = ({ icon, label, active, to }) => (
  <Link
    to={to || "#"}
    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
      active
        ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20"
        : "text-slate-400 hover:bg-slate-700 hover:text-white"
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);

export default StaffDashboard;