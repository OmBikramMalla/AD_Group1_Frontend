import React from "react";
import { Link } from "react-router-dom";
import { ShieldOff, ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Unauthorized() {
  const { getRole } = useAuth();
  const role = getRole();
  const homeMap = { Admin: "/admin/dashboard", Staff: "/staff/dashboard", Customer: "/customer/profile" };
  const home = homeMap[role] ?? "/login";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans p-4">
      <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShieldOff size={40} className="text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-3">Access Denied</h1>
        <p className="text-slate-500 mb-8">
          You don't have permission to view this page.
        </p>
        <Link to={home} className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/20">
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;
