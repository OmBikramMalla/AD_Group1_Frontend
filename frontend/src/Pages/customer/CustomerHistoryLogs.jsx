import React from "react";
import { Link } from "react-router-dom";
import { Package, Wrench, ArrowRight } from "lucide-react";

function CustomerHistoryLogs() {
  return (
    <div className="p-6 sm:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">
            My History
          </h1>
          <p className="text-slate-500 mt-1">
            View your purchase records and vehicle service records.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            to="/customer/purchase-history"
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition group"
          >
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-5">
              <Package size={28} />
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              Purchase History
            </h2>
            <p className="text-slate-500 mt-2">
              View all parts and products you have purchased.
            </p>

            <div className="flex items-center gap-2 mt-5 text-indigo-600 font-semibold">
              Open Purchase History
              <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
            </div>
          </Link>

          <Link
            to="/customer/service-history"
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition group"
          >
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-5">
              <Wrench size={28} />
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              Service History
            </h2>
            <p className="text-slate-500 mt-2">
              View your previous service appointments and records.
            </p>

            <div className="flex items-center gap-2 mt-5 text-emerald-600 font-semibold">
              Open Service History
              <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CustomerHistoryLogs;