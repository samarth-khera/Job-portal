import React from "react";
import { Building2, MapPin, Clock, Bookmark, ArrowRight, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      
      {/* Top Section: Icon & Actions */}
      <div className="flex justify-between items-start mb-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
          {job.company?.companyLogo ? (
            <img
              src={job.company.companyLogo}
              alt={job.company.companyName}
              className="w-10 h-10 object-contain"
            />
          ) : (
            <Building2 className="text-blue-500" size={24} />
          )}
        </div>
        
        {/* Bookmark (Placeholder functionality) */}
        <button className="text-slate-400 hover:text-blue-500 transition-colors p-2 hover:bg-blue-50 rounded-full">
          <Bookmark size={20} />
        </button>
      </div>

      {/* Title & Company */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
          {job.title}
        </h3>
        <p className="text-sm font-medium text-slate-500 flex items-center gap-1">
          {job.company?.companyName || "Unknown Company"}
          {job.isNew && (
            <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-bold">
              New
            </span>
          )}
        </p>
      </div>

      {/* Meta Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-50 text-slate-600 text-xs font-semibold rounded-full border border-slate-100">
          <MapPin size={14} className="text-blue-500" />
          {job.location || "Remote"}
        </span>
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-50 text-slate-600 text-xs font-semibold rounded-full border border-slate-100">
          <Clock size={14} className="text-purple-500" />
          {job.type}
        </span>
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-50 text-slate-600 text-xs font-semibold rounded-full border border-slate-100">
          <DollarSign size={14} className="text-green-500" />
          {job.salaryMin && job.salaryMax
            ? `${job.salaryMin / 1000}k - ${job.salaryMax / 1000}k`
            : "Competitive"}
        </span>
      </div>

      {/* Footer Actions */}
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="text-xs text-slate-400 font-medium">
          Posted {new Date(job.createdAt).toLocaleDateString()}
        </div>
        <Link
          to={`/job/${job._id}`}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl shadow-lg hover:bg-blue-600 hover:shadow-blue-200 transition-all active:scale-95 group-hover:pr-3"
        >
          Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
