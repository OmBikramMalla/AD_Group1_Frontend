import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Phone, ArrowRight, Car, CheckCircle } from "lucide-react";
import api from "../../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getErrorMessage = (err) => {
    const data = err.response?.data;

    if (typeof data === "string") return data;
    if (data?.message) return data.message;
    if (Array.isArray(data)) return data.map((e) => e.description || e.code).join(", ");

    return "Registration failed. Please try again.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await api.post("/auth/register", {
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: "Customer"
      });

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">

        <div className="md:w-5/12 bg-slate-900 text-white flex flex-col justify-between p-10">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Car size={32} />
              AutoLogistics
            </h1>

            <p className="mt-4 text-slate-300 text-base leading-relaxed">
              Create your customer account to manage your profile, vehicles,
              appointments, part requests, reviews, and service history.
            </p>
          </div>

          <div className="mt-10 bg-slate-800 p-4 rounded-xl border border-slate-700">
            <h4 className="font-semibold">Customer Self Registration</h4>
            <p className="text-sm text-slate-300 mt-1">
              Staff and Admin accounts are created internally by the system/admin.
            </p>
          </div>
        </div>

        <div className="md:w-7/12 p-8 sm:p-10">
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-slate-900 mb-4 inline-block"
          >
            ← Back to Home
          </Link>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create Customer Account</h2>
            <p className="text-gray-500 mt-2">
              Register as a customer to access your vehicle service features.
            </p>
          </div>

          {success && (
            <div className="mb-5 flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg text-sm">
              <CheckCircle size={18} />
              Account created successfully. Redirecting to login...
            </div>
          )}

          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <div className="relative mt-1">
                  <User size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-3 py-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-slate-800 outline-none"
                    placeholder="Ram"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <div className="relative mt-1">
                  <User size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-3 py-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-slate-800 outline-none"
                    placeholder="Sharma"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative mt-1">
                <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-3 py-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-slate-800 outline-none"
                  placeholder="ram@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative mt-1">
                <Phone size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-3 py-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-slate-800 outline-none"
                  placeholder="9800000000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative mt-1">
                  <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-3 py-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-slate-800 outline-none"
                    placeholder="Customer123!"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="relative mt-1">
                  <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-3 py-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-slate-800 outline-none"
                    placeholder="Customer123!"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center gap-2 py-2.5 rounded-lg text-white bg-slate-900 hover:bg-slate-800 transition disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : (
                <>
                  Create Customer Account <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-slate-900 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;