import React from "react";
import { Briefcase } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 bg-white mt-10 border-t">
      <div className="container mx-auto px-6 text-center">

        {/* Logo */}
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-md">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-900">JobPortal</span>
        </div>

        {/* Tagline */}
        <p classname="text-gray-600 text-sm max-w-lg mx-auto">
          Connecting talented professionals with innovative companies worldwide.
          Your career success is our mission.
        </p>

        {/* Copyright */}
        <p className="text-gray-500 text-xs mt-6">
          © 2025 Time To Program  
        </p>

        {/* Credits */}
        <p className="text-gray-400 text-xs mt-1">
          Made with ❤️ by Happy Coding
        </p>

      </div>
    </footer>
  );
};

export default Footer;
