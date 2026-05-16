import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login, getRole } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await login(email, password);

      const role = getRole();

      if (role === "Admin") navigate("/admin/dashboard");
      else if (role === "Staff") navigate("/staff/dashboard");
      else navigate("/customer/profile");

    } catch (err) {
      setError(err.response?.data || "Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">

        {/* Back to home */}
        <Link to="/" className="text-sm text-gray-500 hover:text-slate-900 mb-4 inline-block">
          ← Back to Home
        </Link>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Login to AutoLogistics
        </h2>
        <p className="text-gray-500 mb-6">
          Access your dashboard and manage your services
        </p>

        {/* Error */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative mt-1">
              <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-800 outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-800 outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center gap-2 py-2.5 rounded-lg text-white bg-slate-900 hover:bg-slate-800 transition disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : (
              <>
                Sign In <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Register link */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="font-semibold text-slate-900 hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;