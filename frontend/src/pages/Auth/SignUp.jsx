import React, { useState } from "react";
import { Mail, Lock, User, Briefcase, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

import axiosInstance from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";

const SignUp = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ----------------------
  // HANDLE SIGNUP
  // ----------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !role) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      // Backend expects: name, email, password, role
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        role,
      });

      console.log("REGISTER RESPONSE:", response.data);

      setSuccess(true);

      setTimeout(() => navigate("/login"), 1500);

    } catch (error) {
      console.error("SIGNUP ERROR:", error);
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // ----------------------
  // SUCCESS POPUP
  // ----------------------
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
            className="text-green-600 mb-4 flex justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" strokeWidth="1.5"
              stroke="currentColor" className="w-16 h-16">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </motion.div>

          <h2 className="text-2xl font-semibold">Account Created!</h2>
          <p className="text-gray-600 mt-2">Redirecting to login…</p>

          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent animate-spin rounded-full mx-auto mt-6"></div>
        </motion.div>
      </div>
    );
  }

  // ----------------------
  // SIGNUP FORM
  // ----------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-xl shadow-md max-w-lg w-full"
      >
        <h2 className="text-2xl font-semibold text-center">Create Account</h2>
        <p className="text-gray-600 text-center mb-6">
          Join thousands of professionals finding their dream jobs
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* FULL NAME */}
          <div>
            <label className="text-gray-700">Full Name *</label>
            <div className="flex items-center mt-1 border p-3 rounded-lg">
              <User className="text-gray-400 w-5 h-5 mr-3" />
              <input
                type="text"
                className="w-full focus:outline-none"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-gray-700">Email Address *</label>
            <div className="flex items-center mt-1 border p-3 rounded-lg">
              <Mail className="text-gray-400 w-5 h-5 mr-3" />
              <input
                type="email"
                className="w-full focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-gray-700">Password *</label>
            <div className="flex items-center mt-1 border p-3 rounded-lg">
              <Lock className="text-gray-400 w-5 h-5 mr-3" />
              <input
                type="password"
                className="w-full focus:outline-none"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* ROLE SELECTION */}
          <div>
            <label className="text-gray-700">I am a *</label>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div
                onClick={() => setRole("jobseeker")}
                className={`border p-4 rounded-lg cursor-pointer flex flex-col items-center transition ${
                  role === "jobseeker" ? "border-blue-600 bg-blue-50" : "border-gray-300"
                }`}
              >
                <User className="w-6 h-6 mb-2" />
                <p className="font-medium">Job Seeker</p>
              </div>

              <div
                onClick={() => setRole("employer")}
                className={`border p-4 rounded-lg cursor-pointer flex flex-col items-center transition ${
                  role === "employer" ? "border-purple-600 bg-purple-50" : "border-gray-300"
                }`}
              >
                <Briefcase className="w-6 h-6 mb-2" />
                <p className="font-medium">Employer</p>
              </div>
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
                <Loader2 className="animate-spin mr-2" /> Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
