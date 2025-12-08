import axios from "axios";
import { BASE_URL } from "./apiPaths";

// ========================
// AXIOS INSTANCE
// ========================
const axiosInstance = axios.create({
  baseURL: BASE_URL, // http://localhost:5000
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ========================
// REQUEST INTERCEPTOR
// ========================
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ========================
// RESPONSE INTERCEPTOR
// ========================
axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Token expired OR no token
        window.location.href = "/login";
      }

      if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
