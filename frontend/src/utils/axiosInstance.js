import axios from "axios";

// =======================================================
// USE ENV VARIABLE ON VERCEL / PRODUCTION
// IF NOT AVAILABLE → FALLBACK TO localhost
// =======================================================
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// =======================================================
// AXIOS INSTANCE
// =======================================================
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

// =======================================================
// REQUEST INTERCEPTOR → Add Token Automatically
// =======================================================
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

// =======================================================
// RESPONSE INTERCEPTOR → Handle Expired Token
// =======================================================
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend says Unauthorized → redirect to login
    if (error.response?.status === 401) {
      // Prevent redirect during build on Vercel
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }

    if (error.response?.status === 500) {
      console.error("Server error. Please try again later.");
    }

    if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
