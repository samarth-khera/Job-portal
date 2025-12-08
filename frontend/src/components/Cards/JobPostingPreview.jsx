import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function JobPostingPreview({ open, onClose, job }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="relative z-10 max-w-3xl w-full bg-white rounded-xl shadow-xl p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-5">
              <h3 className="text-xl font-semibold">Preview Job Posting</h3>
              <button
                onClick={onClose}
                className="text-sm px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition"
              >
                Close
              </button>
            </div>

            <div className="space-y-4">
              {/* Title */}
              <h4 className="text-2xl font-semibold">
                {job.title || "Untitled Role"}
              </h4>

              {/* Location */}
              <div className="text-gray-600 text-sm">
                {job.location || "Location not specified"}
              </div>

              {/* Category */}
              <div>
                <div className="text-xs font-semibold text-gray-500">Category</div>
                <div className="text-sm mt-1">{job.category || "-"}</div>
              </div>

              {/* Job Type */}
              <div>
                <div className="text-xs font-semibold text-gray-500">Job Type</div>
                <div className="text-sm mt-1">{job.type || "-"}</div>
              </div>

              {/* Description */}
              <div>
                <div className="text-xs font-semibold text-gray-500">Description</div>
                <p className="text-sm mt-1 whitespace-pre-wrap">
                  {job.description || "No description provided."}
                </p>
              </div>

              {/* Requirements */}
              <div>
                <div className="text-xs font-semibold text-gray-500">Requirements</div>
                <p className="text-sm mt-1 whitespace-pre-wrap">
                  {job.requirements || "No requirements listed."}
                </p>
              </div>

              {/* Salary */}
              <div>
                <div className="text-xs font-semibold text-gray-500">Salary Range</div>
                <div className="text-sm mt-1">
                  {job.salaryMin && job.salaryMax
                    ? `₹${job.salaryMin.toLocaleString()} — ₹${job.salaryMax.toLocaleString()}`
                    : "Not specified"}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
