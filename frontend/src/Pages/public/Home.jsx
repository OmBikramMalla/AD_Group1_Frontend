import React from "react";
import { Link } from "react-router-dom";
import {
  Car,
  Calendar,
  FileText,
  Star,
  ChevronRight,
  Wrench,
  BarChart2,
  Bell,
  ShieldCheck,
  Users,
  LogIn,
  LayoutDashboard,
} from "lucide-react";

function Home() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const dashboardPath =
    role === "Admin"
      ? "/admin/dashboard"
      : role === "Staff"
      ? "/staff/dashboard"
      : role === "Customer"
      ? "/customer/dashboard"
      : "/login";

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center">
              <Car size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">
              AutoLogistics
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition">
              How It Works
            </a>
            <a href="#roles" className="hover:text-indigo-600 transition">
              Roles
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {token ? (
              <>
                <Link
                  to={dashboardPath}
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-700 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-slate-900 rounded-xl hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition"
                >
                  <LogIn size={16} />
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_#6366f1,_#312e81_45%,_#0f172a_100%)] text-white">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-cyan-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-semibold text-indigo-100 mb-8 border border-white/20 backdrop-blur-sm">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            Smart vehicle parts and service management system
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight">
            Manage Vehicle Parts, <br />
            Services & Invoices
            <span className="block text-yellow-400 mt-2">Effortlessly.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
            AutoLogistics helps admins manage inventory and reports, staff
            handle customers and invoices, and customers book services, request
            parts, and view history.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {token ? (
              <Link
                to={dashboardPath}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-300 to-amber-400 text-slate-900 rounded-2xl font-bold text-base hover:scale-105 transition shadow-xl shadow-yellow-400/20"
              >
                Go to Dashboard <ChevronRight size={20} />
              </Link>
            ) : (
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-300 to-amber-400 text-slate-900 rounded-2xl font-bold text-base hover:scale-105 transition shadow-xl shadow-yellow-400/20"
              >
                Create Free Account <ChevronRight size={20} />
              </Link>
            )}

            <Link
              to={token ? dashboardPath : "/login"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold text-base hover:bg-white/20 transition backdrop-blur-sm"
            >
              {token ? "Open Dashboard" : "Sign In"}
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto">
            {[
              { value: "16", label: "Core Features" },
              { value: "3", label: "User Roles" },
              { value: "100%", label: "Coursework Scope" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold text-yellow-400">
                  {stat.value}
                </p>
                <p className="text-sm text-indigo-200 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Complete Vehicle Parts Management
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              Built for inventory, sales, service appointments, reports, and
              customer self-service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group"
              >
                <div
                  className={`w-14 h-14 ${f.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {f.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="roles" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Designed for Three Roles
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Each role gets a focused dashboard and only the permissions they need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roles.map((r) => (
              <div
                key={r.title}
                className="rounded-3xl p-8 border border-slate-100 shadow-sm bg-gradient-to-br from-white to-slate-50"
              >
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  {r.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {r.title}
                </h3>
                <ul className="space-y-2 text-slate-500 text-sm">
                  {r.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <ShieldCheck size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              A simple workflow for daily vehicle service center operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-indigo-100" />

            {steps.map((s, i) => (
              <div key={s.title} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold mb-6 shadow-lg shadow-indigo-600/20 relative z-10">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {s.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-indigo-600 via-purple-700 to-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Ready to Manage Operations Better?
          </h2>
          <p className="text-indigo-100 text-lg mb-8">
            Access dashboards for inventory, sales invoices, purchase invoices,
            reports, appointments, and customer history.
          </p>

          <Link
            to={token ? dashboardPath : "/login"}
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-yellow-300 to-amber-400 text-slate-900 rounded-2xl font-bold text-base hover:scale-105 transition shadow-xl"
          >
            {token ? "Go to Dashboard" : "Sign In Now"} <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Car size={16} className="text-white" />
            </div>
            <span className="text-white font-bold">AutoLogistics</span>
          </div>

          <p className="text-sm">
            © {new Date().getFullYear()} AutoLogistics. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>
            <Link to={token ? dashboardPath : "/login"} className="hover:text-white transition">
              {token ? "Dashboard" : "Sign In"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Parts Inventory",
    desc: "Admins can add, edit, delete, and monitor vehicle parts with low-stock tracking.",
    icon: <Wrench size={26} className="text-indigo-600" />,
    bg: "bg-indigo-50",
  },
  {
    title: "Purchase & Sales Invoices",
    desc: "Record vendor purchases, update stock, sell parts, and generate customer invoices.",
    icon: <FileText size={26} className="text-emerald-600" />,
    bg: "bg-emerald-50",
  },
  {
    title: "Appointment Booking",
    desc: "Customers can book appointments and staff can manage service status.",
    icon: <Calendar size={26} className="text-sky-600" />,
    bg: "bg-sky-50",
  },
  {
    title: "Customer History",
    desc: "Staff and customers can view purchase history, service history, and vehicle details.",
    icon: <Car size={26} className="text-purple-600" />,
    bg: "bg-purple-50",
  },
  {
    title: "Financial Reports",
    desc: "Admins can view daily, monthly, and yearly sales, purchases, and profit reports.",
    icon: <BarChart2 size={26} className="text-orange-600" />,
    bg: "bg-orange-50",
  },
  {
    title: "Notifications",
    desc: "Admin receives low-stock alerts and customers can receive credit reminders.",
    icon: <Bell size={26} className="text-rose-600" />,
    bg: "bg-rose-50",
  },
];

const roles = [
  {
    title: "Admin",
    icon: <ShieldCheck size={28} />,
    points: [
      "Manage staff, vendors, parts, and purchase invoices",
      "View financial reports and dashboard summaries",
      "Receive low-stock notifications",
    ],
  },
  {
    title: "Staff",
    icon: <Users size={28} />,
    points: [
      "Register customers and vehicles",
      "Create sales invoices and email invoices",
      "View customer history and manage appointments",
    ],
  },
  {
    title: "Customer",
    icon: <Car size={28} />,
    points: [
      "Book appointments and submit reviews",
      "Request unavailable parts",
      "View purchase and service history",
    ],
  },
];

const steps = [
  {
    title: "Register Users",
    desc: "Admins register staff, staff register customers, and customers can also self-register.",
  },
  {
    title: "Manage Operations",
    desc: "Staff and admins handle parts, vendors, invoices, services, and reports.",
  },
  {
    title: "Track Everything",
    desc: "The system stores purchase history, service records, stock updates, and financial summaries.",
  },
];

export default Home;