import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronDown, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const isAuthenticated = true;
  const user = { fullName: "Alex", role: "employer" };
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <header className="border-b bg-white relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => {
              navigate("/");
              closeMenu();
            }}
          >
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

          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <p
              onClick={() => navigate("/find-jobs")}
              className="text-gray-600 cursor-pointer hover:text-black transition-colors"
            >
              Find Jobs
            </p>

            <p
              onClick={() => navigate("/employer-dashboard")}
              className="text-gray-600 cursor-pointer hover:text-black transition-colors"
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
              <div className="flex items-center space-x-1 cursor-pointer hover:text-black transition-colors">
                <span className="text-gray-700">Guest</span>
                <ChevronDown className="w-4 h-4 text-gray-700" />
              </div>
            )}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden absolute top-16 left-0 w-full bg-white border-b shadow-lg overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 space-y-4">
              <p
                onClick={() => {
                  navigate("/find-jobs");
                  closeMenu();
                }}
                className="text-gray-600 cursor-pointer hover:text-black text-lg py-2 border-b border-gray-100"
              >
                Find Jobs
              </p>

              <p
                onClick={() => {
                  navigate("/employer-dashboard");
                  closeMenu();
                }}
                className="text-gray-600 cursor-pointer hover:text-black text-lg py-2 border-b border-gray-100"
              >
                For Employers
              </p>

              {isAuthenticated && (
                <p className="text-gray-600 text-lg py-2 border-b border-gray-100">
                  Welcome, {user.fullName}
                </p>
              )}

              <div className="pt-2">
                <button
                  onClick={() => {
                    navigate(
                      user.role === "employer"
                        ? "/employer-dashboard"
                        : "/job-dashboard"
                    );
                    closeMenu();
                  }}
                  className="w-full bg-blue-700 hover:bg-purple-700 text-white px-4 py-3 rounded-md transition-all duration-300 shadow-sm"
                >
                  Dashboard
                </button>
              </div>

              {!isAuthenticated && (
                <div className="flex items-center space-x-1 cursor-pointer hover:text-black py-2">
                  <span className="text-gray-700 text-lg">Guest</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
