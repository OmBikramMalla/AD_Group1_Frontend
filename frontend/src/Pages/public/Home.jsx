import React from "react";
import { Link } from "react-router-dom";
import {
  Car, ShieldCheck, Calendar, FileText, Star,
  ChevronRight, Wrench, Users, BarChart2, Bell
} from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Car size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">AutoLogistics</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition">Features</a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition">How It Works</a>
            <a href="#testimonials" className="hover:text-indigo-600 transition">Testimonials</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-semibold text-indigo-100 mb-8 border border-white/20 backdrop-blur-sm">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            Trusted by 500+ vehicle owners in Nepal
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight">
            Your Vehicle, Managed <br />
            <span className="text-yellow-400">Effortlessly.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-indigo-200 max-w-2xl mx-auto leading-relaxed">
            AutoLogistics is the all-in-one platform for managing your vehicle's service history,
            booking appointments, and tracking invoices — all in one beautiful dashboard.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 text-slate-900 rounded-2xl font-bold text-base hover:bg-yellow-300 transition shadow-xl shadow-yellow-400/20"
            >
              Create Free Account <ChevronRight size={20} />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold text-base hover:bg-white/20 transition backdrop-blur-sm"
            >
              Sign In to Dashboard
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: "500+", label: "Happy Customers" },
              { value: "2k+",  label: "Services Booked" },
              { value: "99%",  label: "Satisfaction Rate" },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold text-yellow-400">{stat.value}</p>
                <p className="text-sm text-indigo-200 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Everything You Need
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
              A complete toolkit for customers, staff, and administrators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(f => (
              <div key={f.title} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group">
                <div className={`w-14 h-14 ${f.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">How It Works</h2>
            <p className="mt-4 text-lg text-slate-500">Up and running in 3 simple steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-indigo-100" />
            {steps.map((s, i) => (
              <div key={s.title} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold mb-6 shadow-lg shadow-indigo-600/20 relative z-10">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">What Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.vehicle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to Take Control?</h2>
          <p className="text-indigo-200 text-lg mb-8">
            Join hundreds of vehicle owners who trust AutoLogistics for seamless service management.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-10 py-4 bg-yellow-400 text-slate-900 rounded-2xl font-bold text-base hover:bg-yellow-300 transition shadow-xl"
          >
            Create Your Free Account <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Car size={16} className="text-white" />
            </div>
            <span className="text-white font-bold">AutoLogistics</span>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} AutoLogistics. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link to="/login"    className="hover:text-white transition">Sign In</Link>
            <Link to="/register" className="hover:text-white transition">Register</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

// ── Data ────────────────────────────────────────────────────────────────────
const features = [
  {
    title: "Service History",
    desc:  "View every service record, invoice, and repair detail for your vehicle in one place.",
    icon:  <Wrench size={26} className="text-indigo-600" />,
    bg:    "bg-indigo-50",
  },
  {
    title: "Appointment Booking",
    desc:  "Book service appointments online and get reminders so you never miss a service.",
    icon:  <Calendar size={26} className="text-emerald-600" />,
    bg:    "bg-emerald-50",
  },
  {
    title: "Digital Invoices",
    desc:  "Receive, download, and review digital invoices directly from your customer dashboard.",
    icon:  <FileText size={26} className="text-sky-600" />,
    bg:    "bg-sky-50",
  },
  {
    title: "Vehicle Management",
    desc:  "Register multiple vehicles and manage all their service profiles in one account.",
    icon:  <Car size={26} className="text-purple-600" />,
    bg:    "bg-purple-50",
  },
  {
    title: "Admin Reports",
    desc:  "Admins get real-time financial summaries and customer analytics dashboards.",
    icon:  <BarChart2 size={26} className="text-orange-600" />,
    bg:    "bg-orange-50",
  },
  {
    title: "Notifications",
    desc:  "Stay informed with real-time notifications for appointments, invoices, and updates.",
    icon:  <Bell size={26} className="text-rose-600" />,
    bg:    "bg-rose-50",
  },
];

const steps = [
  {
    title: "Create Your Account",
    desc:  "Sign up in seconds — enter your name, email, and password to get started.",
  },
  {
    title: "Add Your Vehicle",
    desc:  "Register your vehicle with its license plate and model details.",
  },
  {
    title: "Manage Everything",
    desc:  "Book services, view history, and track invoices — all from your dashboard.",
  },
];

const testimonials = [
  {
    quote:   "AutoLogistics makes it so easy to track my car's service history. I love the clean dashboard!",
    name:    "Rajan Sharma",
    vehicle: "Toyota Camry 2021",
  },
  {
    quote:   "Booking a service appointment used to be a headache. Now I do it in under a minute.",
    name:    "Priya Thapa",
    vehicle: "Honda HR-V 2020",
  },
  {
    quote:   "As an admin, the financial reports save me hours every week. Highly recommended.",
    name:    "Bikash Gurung",
    vehicle: "Fleet Manager",
  },
];

export default Home;
