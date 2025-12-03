import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  FileText,
  MessageCircle,
  BadgeCheck,
  Building2,
  BarChart2,
  ShieldCheck,
  Timer
} from "lucide-react";

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Everything You Need to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Succeed
            </span>
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Whether you're looking for your next opportunity or the perfect candidate,
            we have the tools and features to make it happen.
          </p>
        </motion.div>

        {/* Two Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* LEFT — Job Seekers */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              For Job Seekers
            </h3>
            <div className="w-20 h-1 bg-blue-600 rounded mt-1 mb-6"></div>

            <div className="space-y-10">

              {/* Smart Job Matching */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-start gap-4"
              >
                <div className="p-3 rounded-lg bg-blue-100">
                  <Search className="text-blue-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Smart Job Matching</h4>
                  <p className="text-gray-600">
                    AI-powered algorithm matches you with relevant opportunities based on your skills and preferences.
                  </p>
                </div>
              </motion.div>

              {/* Resume Builder */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="p-3 rounded-lg bg-blue-100">
                  <FileText className="text-blue-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Resume Builder</h4>
                  <p className="text-gray-600">
                    Create professional resumes with intuitive templates designed by experts.
                  </p>
                </div>
              </motion.div>

              {/* Direct Communication */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-start gap-4"
              >
                <div className="p-3 rounded-lg bg-blue-100">
                  <MessageCircle className="text-blue-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Direct Communication</h4>
                  <p className="text-gray-600">
                    Connect directly with hiring managers through our secure messaging platform.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>

          {/* RIGHT — Employers */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              For Employers
            </h3>
            <div className="w-20 h-1 bg-purple-600 rounded mt-1 mb-6"></div>

            <div className="space-y-10">

              {/* Talent Pool Access */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-start gap-4"
              >
                <div className="p-3 rounded-lg bg-purple-100">
                  <Building2 className="text-purple-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Talent Pool Access</h4>
                  <p className="text-gray-600">
                    Access our vast database of pre-screened candidates and find the perfect fit for your team.
                  </p>
                </div>
              </motion.div>

              {/* Analytics Dashboard */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="p-3 rounded-lg bg-purple-100">
                  <BarChart2 className="text-purple-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Analytics Dashboard</h4>
                  <p className="text-gray-600">
                    Track hiring performance with detailed analytics and candidate engagement insights.
                  </p>
                </div>
              </motion.div>

              {/* Verified Candidates */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-start gap-4"
              >
                <div className="p-3 rounded-lg bg-purple-100">
                  <ShieldCheck className="text-purple-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Verified Candidates</h4>
                  <p className="text-gray-600">
                    All candidates undergo background verification to ensure you're hiring trustworthy professionals.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16">

          {/* Skill Assessment */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start gap-4"
          >
            <div className="p-3 rounded-lg bg-blue-100">
              <BadgeCheck className="text-blue-700" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Skill Assessment</h4>
              <p className="text-gray-600">
                Showcase your strengths with verified skill tests and earn badges employers trust.
              </p>
            </div>
          </motion.div>

          {/* Quick Hiring */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start gap-4"
          >
            <div className="p-3 rounded-lg bg-purple-100">
              <Timer className="text-purple-700" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Quick Hiring</h4>
              <p className="text-gray-600">
                Automated screening tools reduce time-to-hire by 60% with streamlined workflows.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Features;
