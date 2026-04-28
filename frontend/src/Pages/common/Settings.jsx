import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Settings as SettingsIcon } from "lucide-react";

function Settings() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans p-4">
      <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <SettingsIcon size={32} className="text-indigo-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Settings</h1>
        <p className="text-slate-500 mb-8">Manage your account preferences.</p>
        <button
          onClick={logout}
          className="w-full px-6 py-3 bg-red-50 border border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-100 transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Settings;
