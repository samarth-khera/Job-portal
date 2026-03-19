import React, { useState } from "react";
import { Mail, Lock, User, Briefcase, Loader2, Upload } from "lucide-react";
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
  const [resumeFile, setResumeFile] = useState(null);

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

    if (role === "jobseeker" && !resumeFile) {
      alert("Please upload your resume");
      return;
    }

    setLoading(true);

    try {
      let uploadedResumeUrl = "";

      // Upload resume if role is jobseeker
      if (role === "jobseeker" && resumeFile) {
        const fd = new FormData();
        fd.append("resume", resumeFile);
        
        const uploadRes = await axiosInstance.post(API_PATHS.AUTH.UPLOAD_RESUME, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        
        uploadedResumeUrl = uploadRes.data.url;
      }

      // Backend expects: name, email, password, role, resume
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        role,
        resume: uploadedResumeUrl,
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-2xl shadow-xl border border-slate-100 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" strokeWidth="2"
              stroke="currentColor" className="w-10 h-10 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </motion.div>

          <h2 className="text-3xl font-bold text-slate-900 mb-2">Account Created!</h2>
          <p className="text-slate-500 mb-8">Your journey begins now. Redirecting you to login...</p>

          <div className="flex justify-center">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        </motion.div>
      </div>
    );
  }

  // ----------------------
  // SIGNUP FORM
  // ----------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl border border-slate-100 max-w-[500px] w-full"
      >
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Create Account</h2>
          <p className="text-slate-500 mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg">
            Join thousands of professionals finding their dream jobs
          </p>
        </div>

        <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
          {/* FULL NAME */}
          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none">
                <User className="text-slate-400 w-4.5 h-4.5 sm:w-5 sm:h-5 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-3 sm:py-3.5 bg-slate-50 border-0 ring-1 ring-slate-200 rounded-xl text-slate-900 text-sm sm:text-base placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all duration-200 ease-in-out"
                placeholder="Ex. John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none">
                <Mail className="text-slate-400 w-4.5 h-4.5 sm:w-5 sm:h-5 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input
                type="email"
                 className="block w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-3 sm:py-3.5 bg-slate-50 border-0 ring-1 ring-slate-200 rounded-xl text-slate-900 text-sm sm:text-base placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all duration-200 ease-in-out"
                placeholder="Ex. john@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none">
                <Lock className="text-slate-400 w-4.5 h-4.5 sm:w-5 sm:h-5 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input
                type="password"
                 className="block w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-3 sm:py-3.5 bg-slate-50 border-0 ring-1 ring-slate-200 rounded-xl text-slate-900 text-sm sm:text-base placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all duration-200 ease-in-out"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* ROLE SELECTION */}
          <div className="space-y-2.5 sm:space-y-3 pt-1 sm:pt-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">I am a...</label>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div
                onClick={() => setRole("jobseeker")}
                className={`relative p-3 sm:p-4 rounded-xl cursor-pointer flex flex-col items-center justify-center transition-all duration-200 border-0 ring-1 ${
                  role === "jobseeker" 
                    ? "ring-2 ring-blue-600 bg-blue-50/50 shadow-sm" 
                    : "ring-slate-200 hover:ring-slate-300 hover:bg-slate-50 bg-white"
                }`}
              >
                 <div className={`p-2 rounded-full mb-1 sm:mb-2 ${role === 'jobseeker' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                    <User className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                 </div>
                <p className={`font-semibold text-xs sm:text-sm ${role==='jobseeker' ? 'text-blue-700' : 'text-slate-600'}`}>Job Seeker</p>
              </div>

              <div
                onClick={() => setRole("employer")}
                className={`relative p-3 sm:p-4 rounded-xl cursor-pointer flex flex-col items-center justify-center transition-all duration-200 border-0 ring-1 ${
                  role === "employer" 
                    ? "ring-2 ring-indigo-600 bg-indigo-50/50 shadow-sm" 
                    : "ring-slate-200 hover:ring-slate-300 hover:bg-slate-50 bg-white"
                }`}
              >
                <div className={`p-2 rounded-full mb-1 sm:mb-2 ${role === 'employer' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                    <Briefcase className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                 </div>
                 <p className={`font-semibold text-xs sm:text-sm ${role==='employer' ? 'text-indigo-700' : 'text-slate-600'}`}>Employer</p>
              </div>
            </div>
          </div>

          {/* RESUME UPLOAD (Only for Job Seekers) */}
          {role === "jobseeker" && (
            <div className="space-y-1.5 sm:space-y-2 pt-1 sm:pt-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Upload Resume *</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none">
                  <Upload className="text-slate-400 w-4.5 h-4.5 sm:w-5 sm:h-5 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="block w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-3 sm:py-3.5 bg-slate-50 border-0 ring-1 ring-slate-200 rounded-xl text-slate-900 text-sm sm:text-base focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all duration-200 ease-in-out file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                />
              </div>
              <p className="text-xs text-slate-500 ml-1 mt-1">PDF, DOC, DOCX up to 5MB</p>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 sm:mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex justify-center items-center active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4.5 w-4.5 sm:h-5 sm:w-5" /> Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-all ml-1 text-sm sm:text-base">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
