import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, DollarSign, Tag, CheckCircle } from "lucide-react";

export default function JobPostingPreview({ open, onClose, job }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Background overlay */}
          <motion.div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header / Gradient Top */}
            <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex justify-end">
               <button
                  onClick={onClose}
                  className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors backdrop-blur-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
            </div>

            <div className="px-8 pb-8 -mt-10 overflow-y-auto custom-scrollbar">
              
              {/* Job Header Card */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                 <div>
                    <h3 className="text-2xl font-bold text-gray-900">{job.title || "Untitled Role"}</h3>
                    <div className="flex flex-wrap gap-4 mt-3 text-gray-500 text-sm font-medium">
                       <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-blue-500"/> {job.location || "Location not specified"}</span>
                       <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-purple-500"/> {job.type || "Job Type"}</span>
                       <span className="flex items-center gap-1.5"><Tag className="w-4 h-4 text-emerald-500"/> {job.category || "Category"}</span>
                    </div>
                 </div>
                 
                 <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-100 min-w-[fit-content]">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Salary Range</div>
                    <div className="text-lg font-bold text-gray-800 mt-1 flex items-center gap-1">
                       <DollarSign className="w-4 h-4 text-green-600"/> 
                       {job.salaryMin && job.salaryMax ? `${Number(job.salaryMin).toLocaleString()} - ${Number(job.salaryMax).toLocaleString()}` : "Not disclosed"}
                    </div>
                 </div>
              </div>

              {/* Job Details Content */}
              <div className="mt-8 space-y-8">
                 <section>
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                       <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                       Job Description
                    </h4>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                       {job.description || "No description provided yet."}
                    </p>
                 </section>

                 <section>
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                       <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
                       Requirements
                    </h4>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                       {job.requirements || "No specific requirements listed."}
                    </p>
                 </section>
              </div>
            
              {/* Action Bar Mockup */}
              <div className="mt-10 pt-6 border-t flex justify-end gap-3">
                 <button className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium cursor-not-allowed opacity-60">Save Job</button>
                 <button className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium shadow-lg shadow-blue-500/20 cursor-not-allowed opacity-80">Apply Now</button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
