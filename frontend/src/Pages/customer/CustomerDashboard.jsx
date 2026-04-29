import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Car,
  Calendar,
  FileText,
  Star,
  History,
  ChevronRight,
  Loader2,
  User,
} from "lucide-react";
import api from "../../services/api";

function CustomerDashboard() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const loadDashboard = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.get("/customer-profile/me");
      setProfile(data);
    } catch {
      setError("Failed to load dashboard. Please refresh or login again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 size={36} className="animate-spin text-slate-700" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <button
            onClick={loadDashboard}
            className="px-5 py-2 bg-slate-900 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const firstName = profile?.fullName?.split(" ")[0] || "Customer";
  const vehicles = profile?.vehicles || [];

  const stats = [
    {
      label: "My Vehicles",
      value: vehicles.length,
      icon: <Car size={22} />,
    },
    {
      label: "Appointments",
      value: "—",
      icon: <Calendar size={22} />,
    },
    {
      label: "Invoices",
      value: "—",
      icon: <FileText size={22} />,
    },
    {
      label: "Reviews",
      value: "—",
      icon: <Star size={22} />,
    },
  ];

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Welcome back, {firstName}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage your vehicles, appointments, service history, and reviews.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
            <User size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {profile?.fullName}
            </p>
            <p className="text-xs text-slate-500">{profile?.email}</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-50">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
              >
                <div className="w-11 h-11 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center mb-4">
                  {stat.icon}
                </div>
                <p className="text-3xl font-extrabold text-slate-800">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-slate-800">My Vehicles</h3>
              <Link
                to="/customer/profile"
                className="text-sm font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1"
              >
                Manage <ChevronRight size={16} />
              </Link>
            </div>

            {vehicles.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Car size={40} className="mx-auto mb-3 opacity-30" />
                <p>No vehicles registered yet.</p>
                <Link
                  to="/customer/profile"
                  className="text-slate-800 text-sm font-semibold mt-2 inline-block hover:underline"
                >
                  Add your first vehicle →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vehicles.map((v) => (
                  <div
                    key={v.id}
                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100"
                  >
                    <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center text-slate-700">
                      <Car size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">
                        {v.vehicleBrand} {v.vehicleModel}
                      </p>
                      <p className="text-sm text-slate-500 font-mono">
                        {v.vehicleNumber}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <QuickLink
              to="/customer/appointments"
              icon={<Calendar size={22} />}
              label="Book Appointment"
            />
            <QuickLink
              to="/customer/history"
              icon={<History size={22} />}
              label="Service History"
            />
            <QuickLink
              to="/customer/review"
              icon={<Star size={22} />}
              label="Submit Review"
            />
          </div>
        </div>
      </main>
    </>
  );
}

function QuickLink({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="bg-slate-900 text-white rounded-2xl p-6 flex items-center gap-4 font-bold hover:bg-slate-800 transition shadow-md"
    >
      {icon}
      {label}
      <ChevronRight size={18} className="ml-auto" />
    </Link>
  );
}

export default CustomerDashboard;