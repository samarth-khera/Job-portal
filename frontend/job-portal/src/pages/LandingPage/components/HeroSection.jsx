import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Building2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
        >
          Find Your Dream Job or <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Perfect Hire
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 mt-6 max-w-2xl mx-auto"
        >
          Connect talented professionals with innovative companies.
          Your next career move or perfect candidate is just one click away.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex justify-center items-center gap-4 mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/find-jobs")}
            className="bg-blue-700 hover:bg-purple-700 text-white px-6 py-3 
                       rounded-lg text-lg flex items-center gap-2 shadow-md 
                       hover:shadow-lg transition-all duration-300"
          >
            Find Jobs →
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/post-job")}
            className="border border-gray-300 px-6 py-3 rounded-lg text-lg 
                       hover:bg-gray-100 transition-all duration-300"
          >
            Post a Job
          </motion.button>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20"
        >
          {/* Active Users */}
          <div className="flex flex-col items-center">
            <Users className="w-10 h-10 text-blue-600" />
            <p className="text-3xl font-bold mt-3">2.4M+</p>
            <p className="text-gray-600">Active Users</p>
          </div>

          {/* Companies */}
          <div className="flex flex-col items-center">
            <Building2 className="w-10 h-10 text-purple-600" />
            <p className="text-3xl font-bold mt-3">50K+</p>
            <p className="text-gray-600">Companies</p>
          </div>

          {/* Jobs Posted */}
          <div className="flex flex-col items-center">
            <Briefcase className="w-10 h-10 text-blue-600" />
            <p className="text-3xl font-bold mt-3">150K+</p>
            <p className="text-gray-600">Jobs Posted</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
