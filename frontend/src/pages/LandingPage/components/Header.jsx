import React from "react";
import { motion } from "framer-motion";
import { Briefcase, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const isAuthenticated = true;
  const user = { fullName: "Alex", role: "employer" };
  const navigate = useNavigate();

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer"
               onClick={() => navigate("/")}>
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-md"
            >
              <Briefcase className="h-5 w-5 text-white" />
            </motion.div>

            <span className="text-xl font-bold text-gray-900">JobPortal</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">

            <p
              onClick={() => navigate("/find-jobs")}
              className="text-gray-600 cursor-pointer hover:text-black"
            >
              Find Jobs
            </p>

            <p
              onClick={() => navigate("/employer-dashboard")}
              className="text-gray-600 cursor-pointer hover:text-black"
            >
              For Employers
            </p>

            {isAuthenticated && (
              <p className="text-gray-600">Welcome, {user.fullName}</p>
            )}

            <button
              onClick={() =>
                navigate(
                  user.role === "employer"
                    ? "/employer-dashboard"
                    : "/job-dashboard"
                )
              }
              className="bg-blue-700 hover:bg-purple-700 
                         text-white px-4 py-2 rounded-md 
                         transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Dashboard
            </button>

            {!isAuthenticated && (
              <div className="flex items-center space-x-1 cursor-pointer">
                <span className="text-gray-700">Guest</span>
                <ChevronDown className="w-4 h-4 text-gray-700" />
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
