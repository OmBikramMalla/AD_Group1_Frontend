import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Car, Calendar, History, User, LayoutDashboard,
  FileText, Download, Loader2, Package
} from "lucide-react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function PurchaseHistory() {
  const location = useLocation();
  const { getEmail } = useAuth();
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const email = getEmail();
        const { data: customer } = await api.get(`/customers/by-email?email=${encodeURIComponent(email)}`);
        const { data } = await api.get(`/staff/sales-invoices/customer/${customer.id}`);
        setInvoices(data);
      } catch {
        setInvoices([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 shadow-sm z-10">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg"><Car size={24} className="text-white" /></div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AutoLogistics</h1>
            <p className="text-xs font-medium text-indigo-600 uppercase tracking-wider">Customer Portal</p>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavItem to="/customer/profile"      icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem to="/customer/appointments" icon={<Calendar size={20} />}        label="Appointments" />
          <NavItem to="/customer/history"      icon={<History size={20} />}         label="Service History" active={location.pathname === '/customer/history'} />
          <div className="pt-4 mt-4 border-t border-gray-100">
            <NavItem to="/customer/profile"    icon={<User size={20} />}            label="My Profile" />
          </div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-8 py-5 sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-slate-800">Purchase History</h2>
          <p className="text-sm text-slate-500 mt-0.5">All your sales invoices and purchases.</p>
        </header>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 size={36} className="animate-spin text-indigo-500" />
              </div>
            ) : invoices.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-16 text-center">
                <Package size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-slate-700">No Purchases Yet</h3>
                <p className="text-slate-500 mt-2">Your sales invoices will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {invoices.map(inv => (
                  <div key={inv.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600">
                        <FileText size={22} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">Invoice #{inv.id}</p>
                        <p className="text-sm text-slate-500">
                          {inv.invoiceDate ? new Date(inv.invoiceDate).toLocaleDateString() : "—"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-extrabold text-indigo-600">
                        Rs. {inv.totalAmount?.toLocaleString() ?? "—"}
                      </p>
                      <span className="text-xs font-semibold px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg">
                        {inv.status ?? "Completed"}
                      </span>
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

const NavItem = ({ to, icon, label, active }) => (
  <Link to={to} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${active ? "bg-indigo-50 text-indigo-700 font-bold" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium"}`}>
    {icon} <span>{label}</span>
  </Link>
);

export default PurchaseHistory;
