import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Car,
  Calendar,
  History,
  User,
  LayoutDashboard,
  Wrench,
  Clock,
  CheckCircle,
  Loader2,
} from "lucide-react";
import api from "../../services/api";

const STATUS_STYLE = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Confirmed: "bg-sky-50 text-sky-700 border-sky-200",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Cancelled: "bg-red-50 text-red-600 border-red-200",
};

const STATUS_ICON = {
  Pending: <Clock size={14} />,
  Confirmed: <Calendar size={14} />,
  Completed: <CheckCircle size={14} />,
  Cancelled: <Clock size={14} />,
};

function ServiceHistory() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/customers/my-history");
        setAppointments(data.serviceHistory || []);
      } catch {
        setAppointments([]);
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
          <div className="bg-slate-900 p-2 rounded-lg">
            <Car size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AutoLogistics</h1>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Customer Portal
            </p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavItem
            to="/customer/dashboard"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
          />
          <NavItem
            to="/customer/appointments"
            icon={<Calendar size={20} />}
            label="Appointments"
          />
          <NavItem
            to="/customer/history"
            icon={<History size={20} />}
            label="Service History"
            active={location.pathname === "/customer/history"}
          />
          <div className="pt-4 mt-4 border-t border-gray-100">
            <NavItem
              to="/customer/profile"
              icon={<User size={20} />}
              label="My Profile"
            />
          </div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-8 py-5 sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-slate-800">Service History</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            All your service appointments and their status.
          </p>
        </header>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 size={36} className="animate-spin text-slate-700" />
              </div>
            ) : appointments.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-16 text-center">
                <Wrench size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-slate-700">
                  No Service Records
                </h3>
                <p className="text-slate-500 mt-2 mb-6">
                  Book your first service appointment to get started.
                </p>
                <Link
                  to="/customer/appointments"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition"
                >
                  <Calendar size={18} /> Book Appointment
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appt) => {
                  const statusStyle =
                    STATUS_STYLE[appt.status] ??
                    "bg-slate-50 text-slate-600 border-slate-200";
                  const statusIcon = STATUS_ICON[appt.status] ?? (
                    <Clock size={14} />
                  );

                  return (
                    <div
                      key={appt.appointmentId}
                      className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 flex-shrink-0">
                            <Wrench size={22} />
                          </div>

                          <div>
                            <p className="font-bold text-slate-800 text-lg">
                              {appt.serviceType || "Service Appointment"}
                            </p>

                            <p className="text-sm text-slate-500 mt-1">
                              {appt.appointmentDate
                                ? new Date(appt.appointmentDate).toLocaleDateString(
                                    "en-US",
                                    { dateStyle: "long" }
                                  )
                                : "Date not set"}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border ${statusStyle}`}
                        >
                          {statusIcon} {appt.status || "Pending"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

const NavItem = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
      active
        ? "bg-slate-100 text-slate-900 font-bold"
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium"
    }`}
  >
    {icon} <span>{label}</span>
  </Link>
);

export default ServiceHistory;