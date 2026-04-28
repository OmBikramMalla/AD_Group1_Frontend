import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Search, UserPlus, ShoppingCart,
  Settings, Users, FileText, TrendingUp, Clock, CheckCircle
} from "lucide-react";

const RECENT_TRANSACTIONS = [
  { id: "INV-8501", customer: "Alice Johnson", amount: "$450.00", type: "Parts Sale", time: "10:45 AM", status: "Completed" },
  { id: "INV-8500", customer: "Michael Smith", amount: "$185.50", type: "Service Fee", time: "09:15 AM", status: "Completed" },
  { id: "INV-8499", customer: "Sarah Williams", amount: "$1,250.00", type: "Parts Sale", time: "Yesterday", status: "Unpaid" },
];

function StaffDashboard() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Staff Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-800 text-slate-300 shadow-xl z-10">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-white tracking-tight">AutoLogistics</h1>
          <p className="text-sm text-indigo-400 mt-1">Staff Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem to="/staff/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" active={location.pathname === '/staff/dashboard'} />
          <NavItem to="/staff/customers" icon={<Search size={20} />} label="Customer Search" active={location.pathname === '/staff/customers'} />
          <NavItem to="/staff/register" icon={<UserPlus size={20} />} label="Register Customer" active={location.pathname === '/staff/register'} />
          <NavItem to="/staff/sales" icon={<ShoppingCart size={20} />} label="Point of Sale" active={location.pathname === '/staff/sales'} />
          <NavItem to="/staff/reports" icon={<Settings size={20} />} label="Customer Reports" active={location.pathname === '/staff/reports'} />
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Staff Dashboard</h2>
            <p className="text-sm text-slate-500 mt-1">Welcome back! Here's a quick overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-700">Staff Member</p>
              <p className="text-xs text-slate-500">Service Dept</p>
            </div>
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">SM</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto space-y-6">

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <KpiCard title="Today's Sales" value="$2,345" sub="6 transactions" icon={<TrendingUp size={22} className="text-indigo-500" />} color="bg-indigo-50" />
              <KpiCard title="Customers Served" value="14" sub="Today" icon={<Users size={22} className="text-emerald-500" />} color="bg-emerald-50" />
              <KpiCard title="Pending Invoices" value="3" sub="Require follow-up" icon={<Clock size={22} className="text-amber-500" />} color="bg-amber-50" />
              <KpiCard title="Completed Jobs" value="11" sub="Today" icon={<CheckCircle size={22} className="text-teal-500" />} color="bg-teal-50" />
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-bold text-slate-700 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Link to="/staff/customers" className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center gap-3 hover:border-indigo-400 hover:shadow-md transition-all group text-center">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Search size={22} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">Search Customer</span>
                </Link>
                <Link to="/staff/register" className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center gap-3 hover:border-emerald-400 hover:shadow-md transition-all group text-center">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <UserPlus size={22} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">Register Customer</span>
                </Link>
                <Link to="/staff/sales" className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center gap-3 hover:border-indigo-400 hover:shadow-md transition-all group text-center">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <ShoppingCart size={22} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">New Sale</span>
                </Link>
                <Link to="/staff/reports" className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center gap-3 hover:border-rose-400 hover:shadow-md transition-all group text-center">
                  <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                    <FileText size={22} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">View Reports</span>
                </Link>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
                <Link to="/staff/reports" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">View All →</Link>
              </div>
              <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Invoice</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-slate-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {RECENT_TRANSACTIONS.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono font-bold text-indigo-600">{t.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">{t.customer}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{t.type}</td>
                      <td className="px-6 py-4 text-sm font-mono font-bold text-slate-900 text-right">{t.amount}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2.5 py-1 inline-flex text-xs font-bold rounded-full ${
                          t.status === "Completed" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                        }`}>{t.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
      <p className="text-2xl font-bold text-slate-800 tracking-tight">{value}</p>
      <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
    </div>
  </div>
);

const NavItem = ({ icon, label, active, to }) => (
  <Link to={to || "#"} className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
    active
      ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20"
      : "text-slate-400 hover:bg-slate-700 hover:text-white"
  }`}>
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);

export default StaffDashboard;
