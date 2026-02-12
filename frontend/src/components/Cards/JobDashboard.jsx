import React from "react";
import { Briefcase } from "lucide-react";

const JobDashboard = ({ job }) => {
  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl p-5 mb-4 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 ease-out">
      <div className="flex items-center justify-between">
        
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
            <Briefcase className="w-6 h-6 text-white" />
          </div>

          <div>
            <h4 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
              {job.title}
            </h4>

            <p className="text-gray-500 text-sm mt-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
              Posted on {new Date(job.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE – STATUS BADGE */}
        <div className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-colors duration-300 ${
          job.isClosed
            ? "bg-gray-50 text-gray-500 border-gray-200"
            : "bg-emerald-50 text-emerald-600 border-emerald-100"
        }`}>
          {job.isClosed ? "Closed" : "Active Hiring"}
        </div>
      </div>
      
      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-gray-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default JobDashboard;
