import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Users, TrendingUp, AlertCircle, Search, 
  UserPlus, ShoppingCart, LayoutDashboard, Settings, Award, Clock
} from "lucide-react";

function CustomerReports() {
  const location = useLocation();
  const [activeReport, setActiveReport] = useState("high_spenders");

  // Mock Report Data
  const highSpenders = [
    { id: "CUS-1029", name: "Alice Johnson", totalSpent: 4250.00, visits: 12, lastVisit: "Oct 12, 2023" },
    { id: "CUS-8842", name: "Robert Fox", totalSpent: 3800.50, visits: 8, lastVisit: "Sep 28, 2023" },
    { id: "CUS-7731", name: "Wade Warren", totalSpent: 3100.00, visits: 15, lastVisit: "Oct 20, 2023" },
  ];

  const pendingCredits = [
    { id: "CUS-1029", name: "Alice Johnson", amount: 350.00, daysOverdue: 45, phone: "+1 (555) 123-4567" },
    { id: "CUS-5521", name: "Cameron Williamson", amount: 1200.00, daysOverdue: 60, phone: "+1 (555) 987-6543" },
    { id: "CUS-4490", name: "Brooklyn Simmons", amount: 85.50, daysOverdue: 15, phone: "+1 (555) 456-7890" },
  ];

  const renderContent = () => {
    if (activeReport === "high_spenders") {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-indigo-50/50">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Award className="text-indigo-600" size={20} /> VIP Customers (High Spenders)</h3>
              <p className="text-sm text-slate-500 mt-1">Customers with lifetime spend &gt; $3,000</p>
            </div>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50">Export CSV</button>
          </div>
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Total Spent</th>
                <th className="px-6 py-3 text-center text-xs font-bold text-slate-500 uppercase">Visits</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Last Visit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {highSpenders.map(c => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-bold text-slate-900">{c.name}</div>
                    <div className="text-xs text-slate-500 font-mono">{c.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-mono font-bold text-emerald-600">${c.totalSpent.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-slate-700 font-medium">{c.visits}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-500">{c.lastVisit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (activeReport === "pending_credits") {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-rose-50/50">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><AlertCircle className="text-rose-600" size={20} /> Outstanding Balances</h3>
              <p className="text-sm text-slate-500 mt-1">Customers with unpaid credits</p>
            </div>
            <button className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-bold shadow-md shadow-rose-600/20 hover:bg-rose-700">Send Reminders</button>
          </div>
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-center text-xs font-bold text-slate-500 uppercase">Overdue By</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Amount Due</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pendingCredits.map(c => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-bold text-slate-900">{c.name}</div>
                    <div className="text-xs text-slate-500 font-mono">{c.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{c.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${c.daysOverdue > 30 ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                      {c.daysOverdue} days
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-mono font-bold text-rose-600">${c.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* Staff Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-800 text-slate-300 shadow-xl z-10">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-white tracking-tight">AutoLogistics</h1>
          <p className="text-sm text-indigo-400 mt-1">Staff Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem to="/staff/customers" icon={<Search size={20} />} label="Customer Search" />
          <NavItem to="/staff/register" icon={<UserPlus size={20} />} label="Register Customer" />
          <NavItem to="/staff/sales" icon={<ShoppingCart size={20} />} label="Point of Sale" />
          <NavItem to="/staff/reports" icon={<Settings size={20} />} label="Customer Reports" active={location.pathname === '/staff/reports'} />
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Customer Intelligence</h2>
            <p className="text-sm text-slate-500 mt-1">Generate reports and track customer analytics</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Report Selectors */}
            <div className="lg:col-span-1 space-y-3">
              <button 
                onClick={() => setActiveReport('high_spenders')}
                className={`w-full p-4 rounded-2xl flex flex-col gap-3 transition-all border ${
                  activeReport === 'high_spenders' 
                    ? 'bg-indigo-600 border-indigo-600 shadow-md shadow-indigo-600/20 text-white' 
                    : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-700'
                }`}
              >
                <div className={`p-2 rounded-xl w-max ${activeReport === 'high_spenders' ? 'bg-white/20' : 'bg-indigo-50 text-indigo-600'}`}>
                  <Award size={24} />
                </div>
                <div className="text-left">
                  <h4 className="font-bold">High Spenders</h4>
                  <p className={`text-xs mt-1 ${activeReport === 'high_spenders' ? 'text-indigo-100' : 'text-slate-500'}`}>Top revenue generating customers</p>
                </div>
              </button>

              <button 
                onClick={() => setActiveReport('pending_credits')}
                className={`w-full p-4 rounded-2xl flex flex-col gap-3 transition-all border ${
                  activeReport === 'pending_credits' 
                    ? 'bg-rose-600 border-rose-600 shadow-md shadow-rose-600/20 text-white' 
                    : 'bg-white border-slate-200 hover:border-rose-300 text-slate-700'
                }`}
              >
                <div className={`p-2 rounded-xl w-max ${activeReport === 'pending_credits' ? 'bg-white/20' : 'bg-rose-50 text-rose-600'}`}>
                  <AlertCircle size={24} />
                </div>
                <div className="text-left">
                  <h4 className="font-bold">Pending Credits</h4>
                  <p className={`text-xs mt-1 ${activeReport === 'pending_credits' ? 'text-rose-100' : 'text-slate-500'}`}>Customers with overdue unpaid balances</p>
                </div>
              </button>
            </div>

            {/* Report Content */}
            <div className="lg:col-span-3">
              {renderContent()}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

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

export default CustomerReports;
