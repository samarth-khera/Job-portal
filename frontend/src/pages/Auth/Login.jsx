import React, { useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

import axiosInstance from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // -------------------------
  // HANDLE LOGIN
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      login(user, token); // Save in AuthContext

      setSuccess(true);

      // ROLE-BASED REDIRECT
      const redirectPath =
        user.role === "employer"
          ? "/employer-dashboard"
          : "/find-jobs";

      setTimeout(() => navigate(redirectPath), 1200);

    } catch (error) {
      console.error("LOGIN ERROR:", error);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // SUCCESS POPUP
  // -------------------------
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-green-600 flex justify-center mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" strokeWidth="1.5"
              stroke="currentColor" className="w-16 h-16">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </motion.div>

          <h2 className="text-2xl font-semibold text-gray-800">
            Login Successful!
          </h2>
          <p className="text-gray-600 mt-2">Redirecting to your dashboard…</p>

          <div className="animate-spin w-6 h-6 border-2 border-blue-600 
            border-t-transparent rounded-full mx-auto mt-6">
          </div>
        </motion.div>
      </div>
    );
  }

  // -------------------------
  // LOGIN FORM
  // -------------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-xl shadow-md max-w-md w-full"
      >
        <h2 className="text-2xl font-semibold text-center">Welcome Back</h2>
        <p className="text-gray-600 text-center mb-6">
          Sign in to your JobPortal account
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div>
            <label className="text-gray-700">Email Address</label>
            <div className="flex items-center mt-1 border p-3 rounded-lg">
              <Mail className="text-gray-400 w-5 h-5 mr-3" />
              <input
                type="email"
                className="w-full focus:outline-none"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-gray-700">Password</label>
            <div className="flex items-center mt-1 border p-3 rounded-lg">
              <Lock className="text-gray-400 w-5 h-5 mr-3" />
              <input
                type="password"
                className="w-full focus:outline-none"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 
              text-white py-3 rounded-lg flex justify-center items-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" /> Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Create one here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
