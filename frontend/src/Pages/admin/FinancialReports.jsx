import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, DollarSign, TrendingUp, Calendar, 
  Download, Filter, ArrowUpRight, ArrowDownRight,
  PieChart, Activity, LayoutDashboard
, Package, ShoppingCart, Building2, Users, Bell, User, Shield} from "lucide-react";

function FinancialReports() {
  const location = useLocation();
  const [reportPeriod, setReportPeriod] = useState("monthly");

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* Admin Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 shadow-xl z-10">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-white tracking-tight">AutoLogistics</h1>
          <p className="text-sm text-indigo-400 mt-1">Admin Portal</p>
        </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          <NavItem to="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" active={location.pathname === '/admin/dashboard'} />
          <NavItem to="/admin/reports" icon={<BarChart3 size={20} />} label="Financial Reports" active={location.pathname === '/admin/reports'} />
          <NavItem to="/admin/parts" icon={<Package size={20} />} label="Parts Inventory" active={location.pathname === '/admin/parts'} />
          <NavItem to="/admin/purchase-invoice" icon={<ShoppingCart size={20} />} label="Purchase Invoices" active={location.pathname === '/admin/purchase-invoice'} />
          <NavItem to="/admin/vendors" icon={<Building2 size={20} />} label="Vendor Management" active={location.pathname === '/admin/vendors'} />
          <NavItem to="/admin/staff" icon={<Users size={20} />} label="Staff Management" active={location.pathname === '/admin/staff'} />
          <NavItem to="/admin/notifications" icon={<Bell size={20} />} label="Notifications" active={location.pathname === '/admin/notifications'} />
          
          <div className="pt-4 mt-4 border-t border-slate-800">
            <NavItem to="/admin/profile" icon={<User size={20} />} label="Profile" />
            <NavItem to="/admin/staff" icon={<Shield size={20} />} label="Role Management" />
          </div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Financial Reports</h2>
            <p className="text-sm text-slate-500 mt-1">Overview of revenue, expenses, and profits</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-medium hover:bg-indigo-100 transition">
              <Download size={18} /> Export PDF
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KpiCard 
                title="Total Revenue" 
                value="$124,500" 
                trend="+12.5%" 
                isPositive={true} 
                icon={<DollarSign size={24} className="text-emerald-500" />} 
                color="bg-emerald-50"
              />
              <KpiCard 
                title="Total Expenses" 
                value="$84,200" 
                trend="-2.4%" 
                isPositive={true} 
                icon={<Activity size={24} className="text-rose-500" />} 
                color="bg-rose-50"
              />
              <KpiCard 
                title="Net Profit" 
                value="$40,300" 
                trend="+8.2%" 
                isPositive={true} 
                icon={<TrendingUp size={24} className="text-indigo-500" />} 
                color="bg-indigo-50"
              />
              <KpiCard 
                title="Pending Invoices" 
                value="$12,450" 
                trend="+4.1%" 
                isPositive={false} 
                icon={<Calendar size={24} className="text-amber-500" />} 
                color="bg-amber-50"
              />
            </div>

            {/* Controls */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
                {['daily', 'weekly', 'monthly', 'yearly'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setReportPeriod(period)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${
                      reportPeriod === period 
                        ? 'bg-white text-indigo-700 shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition text-sm">
                <Filter size={16} /> Advanced Filter
              </button>
            </div>

            {/* Charts Area Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-800">Revenue vs Expenses</h3>
                </div>
                {/* Mock Chart Area */}
                <div className="h-72 w-full bg-slate-50 rounded-xl border border-slate-100 flex items-end justify-between p-4 px-8 relative">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between py-4 px-8 pointer-events-none">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-full border-t border-slate-200"></div>)}
                  </div>
                  {/* Bars */}
                  {[40, 60, 45, 80, 65, 90, 75].map((h, i) => (
                    <div key={i} className="w-8 md:w-12 flex gap-1 z-10 h-full items-end group">
                      <div className="w-1/2 bg-indigo-500 rounded-t-sm hover:bg-indigo-600 transition-all cursor-pointer" style={{ height: `${h}%` }}></div>
                      <div className="w-1/2 bg-rose-400 rounded-t-sm hover:bg-rose-500 transition-all cursor-pointer" style={{ height: `${h * 0.7}%` }}></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600"><span className="w-3 h-3 bg-indigo-500 rounded-full"></span> Revenue</div>
                  <div className="flex items-center gap-2 text-sm text-slate-600"><span className="w-3 h-3 bg-rose-400 rounded-full"></span> Expenses</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Revenue by Category</h3>
                
                {/* Mock Donut Chart */}
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="relative w-48 h-48 mb-6">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="20" />
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#6366f1" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="60" />
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="190" />
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="230" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <PieChart className="text-slate-300" size={32} />
                    </div>
                  </div>
                  
                  <div className="w-full space-y-3">
                    <div className="flex justify-between text-sm"><span className="flex items-center gap-2"><span className="w-3 h-3 bg-indigo-500 rounded-full"></span> Parts Sales</span><span className="font-bold">55%</span></div>
                    <div className="flex justify-between text-sm"><span className="flex items-center gap-2"><span className="w-3 h-3 bg-emerald-500 rounded-full"></span> Services</span><span className="font-bold">30%</span></div>
                    <div className="flex justify-between text-sm"><span className="flex items-center gap-2"><span className="w-3 h-3 bg-amber-500 rounded-full"></span> Subscriptions</span><span className="font-bold">15%</span></div>
                  </div>
                </div>
              </div>

            </div>

            {/* Recent Transactions Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Transaction ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {[
                      { id: 'TRX-901', date: 'Today, 10:45 AM', type: 'Parts Sale', amount: '+$450.00', status: 'Completed', statusColor: 'bg-emerald-100 text-emerald-800' },
                      { id: 'TRX-902', date: 'Today, 09:15 AM', type: 'Vendor Payment', amount: '-$1,200.00', status: 'Processed', statusColor: 'bg-blue-100 text-blue-800' },
                      { id: 'TRX-903', date: 'Yesterday', type: 'Service Fee', amount: '+$185.50', status: 'Completed', statusColor: 'bg-emerald-100 text-emerald-800' },
                      { id: 'TRX-904', date: 'Yesterday', type: 'Utility Bill', amount: '-$340.00', status: 'Pending', statusColor: 'bg-amber-100 text-amber-800' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{row.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{row.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{row.type}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-right ${row.amount.startsWith('+') ? 'text-emerald-600' : 'text-slate-900'}`}>{row.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${row.statusColor}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
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

const KpiCard = ({ title, value, trend, isPositive, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
      <div className={`flex items-center gap-1 text-sm font-bold ${isPositive ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'} px-2 py-1 rounded-lg`}>
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {trend}
      </div>
    </div>
    <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-3xl font-bold text-slate-800 tracking-tight">{value}</p>
  </div>
);

const NavItem = ({ icon, label, active, to, badge }) => (
  <Link to={to || "#"} className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
    active 
      ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20" 
      : "text-slate-400 hover:bg-slate-800 hover:text-white"
  }`}>
    <div className="flex items-center gap-3">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
    {badge > 0 && (
      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${active ? 'bg-white text-indigo-600' : 'bg-rose-500 text-white'}`}>
        {badge}
      </span>
    )}
  </Link>
);

export default FinancialReports;
