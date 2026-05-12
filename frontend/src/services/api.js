import axios from "axios";

const API_BASE_URL = "http://localhost:5093/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const clearAuthStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("authToken");
  localStorage.removeItem("role");
  localStorage.removeItem("user");

  window.dispatchEvent(new Event("authChanged"));
};

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("jwtToken") ||
      localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthStorage();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;