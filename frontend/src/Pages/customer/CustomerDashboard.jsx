import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Car, Calendar, FileText, Star, Bell,
  LayoutDashboard, User, History, ChevronRight, Loader2
} from "lucide-react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function CustomerDashboard() {
  const location = useLocation();
  const { getEmail } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const email = getEmail();
        const { data: customer } = await api.get(`/customers/by-email?email=${encodeURIComponent(email)}`);
        const { data: detail } = await api.get(`/customers/${customer.id}/vehicles`);
        setData({ customer, vehicles: detail });
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 size={36} className="animate-spin text-indigo-500" />
      </div>
    );
  }

  const name = data?.customer?.fullName?.split(" ")[0] ?? "Customer";

  return (
    <>
        <header className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Welcome back, {name} 👋</h2>
            <p className="text-sm text-slate-500 mt-0.5">Here's your vehicle overview.</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="max-w-5xl mx-auto space-y-8">

            {/* Quick stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { label: "My Vehicles",   value: data?.vehicles?.length ?? 0, icon: <Car size={22} />,      color: "bg-indigo-50 text-indigo-600" },
                { label: "Appointments",  value: "—",                          icon: <Calendar size={22} />,  color: "bg-emerald-50 text-emerald-600" },
                { label: "Invoices",      value: "—",                          icon: <FileText size={22} />,  color: "bg-sky-50 text-sky-600" },
                { label: "Reviews",       value: "—",                          icon: <Star size={22} />,      color: "bg-amber-50 text-amber-600" },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className={`w-11 h-11 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                    {stat.icon}
                  </div>
                  <p className="text-3xl font-extrabold text-slate-800">{stat.value}</p>
                  <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Vehicles summary */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-bold text-slate-800">My Vehicles</h3>
                <Link to="/customer/profile" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                  Manage <ChevronRight size={16} />
                </Link>
              </div>
              {data?.vehicles?.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <Car size={40} className="mx-auto mb-3 opacity-30" />
                  <p>No vehicles registered yet.</p>
                  <Link to="/customer/profile" className="text-indigo-600 text-sm font-semibold mt-2 inline-block hover:underline">
                    Add your first vehicle →
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.vehicles.map(v => (
                    <div key={v.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                        <Car size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{v.vehicleBrand} {v.vehicleModel}</p>
                        <p className="text-sm text-slate-500 font-mono">{v.vehicleNumber}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { to: "/customer/appointments", label: "Book Appointment",  icon: <Calendar size={22} />, color: "bg-emerald-600" },
                { to: "/customer/history",      label: "Service History",   icon: <History size={22} />,  color: "bg-sky-600" },
                { to: "/customer/review",       label: "Submit Review",     icon: <Star size={22} />,     color: "bg-amber-500" },
              ].map(link => (
                <Link key={link.to} to={link.to}
                  className={`${link.color} text-white rounded-2xl p-6 flex items-center gap-4 font-bold hover:opacity-90 transition shadow-md`}>
                  {link.icon} {link.label} <ChevronRight size={18} className="ml-auto" />
                </Link>
              ))}
            </div>

          </div>
        </div>
    </>
  );
}



export default CustomerDashboard;
