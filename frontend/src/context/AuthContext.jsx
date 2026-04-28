import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);   // { token, role, name, email, id }
  const [loading, setLoading] = useState(true);

  /* ── Restore session from localStorage on first mount ── */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          token,
          role:  decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
              ?? decoded.role
              ?? decoded.Role
              ?? null,
          name:  decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
              ?? decoded.name
              ?? localStorage.getItem("name")
              ?? "",
          email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]
              ?? decoded.email
              ?? localStorage.getItem("email")
              ?? "",
          id:    decoded.sub ?? decoded.nameid ?? decoded.id ?? null,
        });
      } catch {
        // invalid token — clear it
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
      }
    }
    setLoading(false);
  }, []);

  /* ── Login: POST to /auth/login, decode JWT, persist ── */
  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    const token    = data.token ?? data.Token ?? data.accessToken;

    if (!token) throw new Error("No token returned from server.");

    const decoded = jwtDecode(token);
    const role  = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
               ?? decoded.role
               ?? decoded.Role
               ?? null;
    const name  = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
               ?? decoded.name
               ?? email;
    const userEmail = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]
               ?? decoded.email
               ?? email;
    const id    = decoded.sub ?? decoded.nameid ?? decoded.id ?? null;

    localStorage.setItem("token", token);
    localStorage.setItem("name",  name);
    localStorage.setItem("email", userEmail);

    const userData = { token, role, name, email: userEmail, id };
    setUser(userData);
    return userData;
  };

  /* ── Logout: clear everything ── */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    setUser(null);
  };

  /* ── Convenience helpers (used by Login, CustomerDashboard, CustomerProfile) ── */
  const getRole  = () => user?.role  ?? null;
  const getEmail = () => user?.email ?? localStorage.getItem("email") ?? null;

  const isAuthenticated = !!user;
  const userRole        = user?.role ?? null;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, userRole, loading, getRole, getEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ── Custom hook ── */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

export default AuthContext;
