import React from "react";
import { Link } from "react-router-dom";
import { Car, Info, ChevronRight } from "lucide-react";

function About() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Car size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">AutoLogistics</span>
          </Link>
          <div className="flex gap-3">
            <Link to="/login" className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition">Sign In</Link>
            <Link to="/register" className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition">Get Started</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-24 text-center px-6">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Info size={32} className="text-white" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">About AutoLogistics</h1>
        <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
          Built to modernize vehicle service management — from customer self-registration
          to full admin oversight — all in one streamlined platform.
        </p>
      </section>

      {/* Mission */}
      <section className="py-20 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Our Mission</h2>
        <p className="text-slate-600 text-lg leading-relaxed">
          AutoLogistics was built to bridge the gap between vehicle owners and service centers.
          We believe managing your car's service history, booking appointments, and reviewing invoices
          should be simple, transparent, and accessible from anywhere.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-16 text-center text-white px-6">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-400 text-slate-900 rounded-2xl font-bold hover:bg-yellow-300 transition shadow-xl">
          Create Free Account <ChevronRight size={20} />
        </Link>
      </section>
    </div>
  );
}

export default About;
