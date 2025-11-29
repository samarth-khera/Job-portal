import React, { useState } from "react";
import { Mail, Lock, User, Upload, Briefcase, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  // FORM STATES
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // jobseeker / employer
  const [loading, setLoading] = useState(false);

  // PHOTO UPLOAD STATES
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // SUCCESS POPUP
  const [success, setSuccess] = useState(false);

  // SUBMIT LOGIC (BEGINNER LEVEL)
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (!fullName || !email || !password || !role) {
        alert("Please fill all required fields");
        setLoading(false);
        return;
      }

      console.log("Form Submitted:");
      console.log({ fullName, email, password, role, photo });

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);

      setLoading(false);
    }, 1500);
  };

  // SUCCESS POPUP SCREEN
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-16 h-16"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </motion.div>

          <h2 className="text-2xl font-semibold text-gray-800">Account Created!</h2>
          <p className="text-gray-600 mt-2">Your account has been successfully created.</p>

          <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mt-6"></div>

          <p className="text-gray-500 text-sm mt-3">Redirecting to login…</p>
        </motion.div>
      </div>
    );
  }

  // MAIN SIGN-UP FORM
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

          {/* PHOTO UPLOAD */}
          <div>
            <label className="text-gray-700">Profile Picture (Optional)</label>

            <label className="flex items-center mt-1 border p-3 rounded-lg cursor-pointer">
              <Upload className="text-gray-500 w-5 h-5 mr-3" />
              <span className="text-gray-600">Upload Photo</span>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setPhoto(file);
                    setPhotoPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>

            <p className="text-xs text-gray-500 mt-1">JPG, PNG — up to 5MB</p>

            {photoPreview && (
              <div className="mt-3 flex justify-center">
                <img
                  src={photoPreview}
                  alt="preview"
                  className="w-24 h-24 rounded-full object-cover shadow-md"
                />
              </div>
            )}
          </div>

          {/* ROLE SELECTION */}
          <div className="mt-6">
            <label className="text-gray-700">I am a *</label>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div
                onClick={() => setRole("jobseeker")}
                className={`border p-4 rounded-lg flex flex-col items-center cursor-pointer transition ${
                  role === "jobseeker" ? "border-blue-600 bg-blue-50" : "border-gray-300"
                }`}
              >
                <User className="w-6 h-6 mb-2" />
                <p className="font-medium">Job Seeker</p>
              </div>

              <div
                onClick={() => setRole("employer")}
                className={`border p-4 rounded-lg flex flex-col items-center cursor-pointer transition ${
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
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg flex justify-center items-center"
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
