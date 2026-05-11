import React, { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import api from "../../services/api";

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.put("/auth/change-password", formData);

      setSuccess(res.data.message || "Password changed successfully.");

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      const data = err.response?.data;

      if (data?.errors && Array.isArray(data.errors)) {
        setError(data.errors.join(" "));
      } else {
        setError(data?.message || "Failed to change password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-8 py-5 sticky top-0 z-10">
        <h2 className="text-2xl font-bold text-gray-800">
          Change Password
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Update your account password securely.
        </p>
      </header>

      <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-50">
        <div className="max-w-xl mx-auto">
          {success && (
            <div className="mb-5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-3 rounded-xl flex gap-3 items-center">
              <CheckCircle size={20} />
              <span>{success}</span>
            </div>
          )}

          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl flex gap-3 items-center">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8"
          >
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800 mb-5">
              <Lock size={28} />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Security Settings
            </h3>

            <p className="text-sm text-slate-500 mb-6">
              Use a strong password with uppercase, lowercase, number, and symbol.
            </p>

            <div className="space-y-5">
              <PasswordField
                label="Current Password"
                name="currentPassword"
                value={formData.currentPassword}
                show={show.currentPassword}
                onChange={handleChange}
                onToggle={() =>
                  setShow((prev) => ({
                    ...prev,
                    currentPassword: !prev.currentPassword,
                  }))
                }
              />

              <PasswordField
                label="New Password"
                name="newPassword"
                value={formData.newPassword}
                show={show.newPassword}
                onChange={handleChange}
                onToggle={() =>
                  setShow((prev) => ({
                    ...prev,
                    newPassword: !prev.newPassword,
                  }))
                }
              />

              <PasswordField
                label="Confirm New Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                show={show.confirmPassword}
                onChange={handleChange}
                onToggle={() =>
                  setShow((prev) => ({
                    ...prev,
                    confirmPassword: !prev.confirmPassword,
                  }))
                }
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-7 w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}

              {loading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

function PasswordField({
  label,
  name,
  value,
  show,
  onToggle,
  onChange,
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="mt-2 relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          required
          className="w-full p-3 pr-12 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-800"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;