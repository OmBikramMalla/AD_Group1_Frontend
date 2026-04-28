import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, BarChart3, Package, ShoppingCart,
  Building2, Users, Bell, User, Shield,
  DollarSign, TrendingUp, AlertTriangle, CheckCircle
} from "lucide-react";

const RECENT_ACTIVITY = [
  { id: "TRX-901", description: "Parts Sale — Alice Johnson", amount: "+$450.00", time: "10:45 AM", positive: true },
  { id: "INV-P-8472", description: "Purchase Invoice — AutoParts Co.", amount: "-$1,200.00", time: "09:15 AM", positive: false },
  { id: "TRX-900", description: "Service Fee — Robert Fox", amount: "+$185.50", time: "Yesterday", positive: true },
];

function AdminDashboard() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Admin Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 shadow-xl z-10">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-white tracking-tight">AutoLogistics</h1>
          <p className="text-sm text-indigo-400 mt-1">Admin Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem to="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" active={location.pathname === '/admin/dashboard'} />
          <NavItem to="/admin/reports" icon={<BarChart3 size={20} />} label="Financial Reports" active={location.pathname === '/admin/reports'} />
          <NavItem to="/admin/parts" icon={<Package size={20} />} label="Parts Inventory" active={location.pathname === '/admin/parts'} />
          <NavItem to="/admin/purchase-invoice" icon={<ShoppingCart size={20} />} label="Purchase Invoices" active={location.pathname === '/admin/purchase-invoice'} />
          <NavItem to="/admin/vendors" icon={<Building2 size={20} />} label="Vendor Management" active={location.pathname === '/admin/vendors'} />
          <NavItem to="/admin/staff" icon={<Users size={20} />} label="Staff Management" active={location.pathname === '/admin/staff'} />
          <NavItem to="/admin/notifications" icon={<Bell size={20} />} label="Notifications" active={location.pathname === '/admin/notifications'} />
          <div className="pt-4 mt-4 border-t border-slate-800">
            <NavItem to="/admin/profile" icon={<User size={20} />} label="Profile" active={location.pathname === '/admin/profile'} />
            <NavItem to="/admin/staff" icon={<Shield size={20} />} label="Role Management" />
          </div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Admin Dashboard</h2>
            <p className="text-sm text-slate-500 mt-1">System overview and quick access</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto space-y-6">

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <KpiCard title="Total Revenue" value="$124,500" sub="+12.5% this month" icon={<DollarSign size={22} className="text-emerald-500" />} color="bg-emerald-50" />
              <KpiCard title="Net Profit" value="$40,300" sub="+8.2% vs last month" icon={<TrendingUp size={22} className="text-indigo-500" />} color="bg-indigo-50" />
              <KpiCard title="Low Stock Alerts" value="2" sub="Parts need reorder" icon={<AlertTriangle size={22} className="text-rose-500" />} color="bg-rose-50" />
              <KpiCard title="Active Staff" value="12" sub="On duty today" icon={<CheckCircle size={22} className="text-teal-500" />} color="bg-teal-50" />
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-bold text-slate-700 mb-4">Quick Access</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { to: "/admin/reports", icon: <BarChart3 size={22} />, label: "Reports", color: "indigo" },
                  { to: "/admin/parts", icon: <Package size={22} />, label: "Inventory", color: "emerald" },
                  { to: "/admin/purchase-invoice", icon: <ShoppingCart size={22} />, label: "Invoices", color: "amber" },
                  { to: "/admin/vendors", icon: <Building2 size={22} />, label: "Vendors", color: "teal" },
                  { to: "/admin/staff", icon: <Users size={22} />, label: "Staff", color: "violet" },
                  { to: "/admin/notifications", icon: <Bell size={22} />, label: "Alerts", color: "rose" },
                ].map((item) => (
                  <Link key={item.to} to={item.to} className={`bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center gap-3 hover:border-${item.color}-400 hover:shadow-md transition-all group text-center`}>
                    <div className={`w-11 h-11 bg-${item.color}-50 rounded-xl flex items-center justify-center text-${item.color}-600 group-hover:bg-${item.color}-600 group-hover:text-white transition-colors`}>
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-700">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
                <Link to="/admin/reports" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">View Reports →</Link>
              </div>
              <div className="divide-y divide-slate-100">
                {RECENT_ACTIVITY.map((item) => (
                  <div key={item.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{item.description}</p>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">{item.id} · {item.time}</p>
                    </div>
                    <span className={`text-sm font-mono font-bold ${item.positive ? 'text-emerald-600' : 'text-slate-700'}`}>{item.amount}</span>
                  </div>
                ))}
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
      <p className="text-2xl font-bold text-slate-800 tracking-tight">{value}</p>
      <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
    </div>
  </div>
);

const NavItem = ({ icon, label, active, to }) => (
  <Link to={to || "#"} className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
    active
      ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20"
      : "text-slate-400 hover:bg-slate-800 hover:text-white"
  }`}>
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);

export default AdminDashboard;
