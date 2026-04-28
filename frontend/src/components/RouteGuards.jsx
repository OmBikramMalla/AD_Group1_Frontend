import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute — wraps routes that require authentication and a specific role.
 * Usage: <Route element={<ProtectedRoute roles={["Admin"]} />}>…</Route>
 */
export function ProtectedRoute({ roles }) {
  const { isAuthenticated, userRole, loading } = useAuth();
  const location = useLocation();

  // Wait until auth state is restored from localStorage
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in → send to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but wrong role → send to unauthorised page
  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

/**
 * PublicOnlyRoute — wraps routes that should NOT be accessible once logged in
 * (e.g. /login, /register). Redirects to the appropriate dashboard.
 */
export function PublicOnlyRoute() {
  const { isAuthenticated, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    const dashboardMap = {
      Admin:    "/admin/dashboard",
      Staff:    "/staff/dashboard",
      Customer: "/customer/dashboard",
    };
    return <Navigate to={dashboardMap[userRole] ?? "/"} replace />;
  }

  return <Outlet />;
}
