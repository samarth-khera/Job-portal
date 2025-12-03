import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  Target,
  TrendingUp
} from "lucide-react";

const Analytics = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Platform{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Analytics
            </span>
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Real-time insights and data-driven results that showcase the power of our
            platform in connecting talent with opportunities.
          </p>
        </motion.div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-6 bg-white rounded-2xl shadow-md border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <Users className="w-10 h-10 text-blue-600" />
              <span className="text-green-600 font-semibold">+15%</span>
            </div>
            <h3 className="text-3xl font-bold mt-4">2.4M+</h3>
            <p className="text-gray-600">Active Users</p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-6 bg-white rounded-2xl shadow-md border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <Briefcase className="w-10 h-10 text-purple-600" />
              <span className="text-green-600 font-semibold">+22%</span>
            </div>
            <h3 className="text-3xl font-bold mt-4">150K+</h3>
            <p className="text-gray-600">Jobs Posted</p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="p-6 bg-white rounded-2xl shadow-md border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <Target className="w-10 h-10 text-gray-700" />
              <span className="text-green-600 font-semibold">+18%</span>
            </div>
            <h3 className="text-3xl font-bold mt-4">89K+</h3>
            <p className="text-gray-600">Successful Hires</p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="p-6 bg-white rounded-2xl shadow-md border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <TrendingUp className="w-10 h-10 text-green-600" />
              <span className="text-green-600 font-semibold">+8%</span>
            </div>
            <h3 className="text-3xl font-bold mt-4">94%</h3>
            <p className="text-gray-600">Match Rate</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Analytics;
