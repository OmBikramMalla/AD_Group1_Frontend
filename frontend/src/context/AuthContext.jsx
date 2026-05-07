import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDecodedUser = (token) => {
    const decoded = jwtDecode(token);

    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      throw new Error("Token expired");
    }

    const role =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
      decoded.role ??
      decoded.Role ??
      null;

    const name =
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ??
      decoded.name ??
      localStorage.getItem("name") ??
      "";

    const email =
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] ??
      decoded.email ??
      localStorage.getItem("email") ??
      "";

    const id =
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ] ??
      decoded.sub ??
      decoded.nameid ??
      decoded.id ??
      null;

    if (!role) {
      throw new Error("Role not found in token");
    }

    return { token, role, name, email, id };
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const userData = getDecodedUser(token);
        setUser(userData);
      } catch {
        localStorage.clear();
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });

    const token = data.token ?? data.Token ?? data.accessToken;

    if (!token) {
      throw new Error("No token returned from server.");
    }

    const userData = getDecodedUser(token);

    localStorage.setItem("token", token);
    localStorage.setItem("role", userData.role);
    localStorage.setItem("name", userData.name);
    localStorage.setItem("email", userData.email);

    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    setUser(null);
  };

  const getRole = () => user?.role ?? localStorage.getItem("role") ?? null;
  const getEmail = () => user?.email ?? localStorage.getItem("email") ?? null;

  const isAuthenticated = !!user?.token;
  const userRole = user?.role ?? null;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        userRole,
        loading,
        getRole,
        getEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }

  return ctx;
}

export default AuthContext;