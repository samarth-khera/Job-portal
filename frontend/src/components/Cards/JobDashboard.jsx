import React from "react";
import { Briefcase } from "lucide-react";

const JobDashboard = ({ job }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border bg-white mb-3 hover:shadow-sm transition">
      
      {/* LEFT SIDE */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-blue-600" />
        </div>

        <div>
          <h4 className="text-base font-semibold text-gray-800">
            {job.title}
          </h4>

          <p className="text-gray-500 text-sm">
            Posted: {new Date(job.createdAt).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE – STATUS BADGE */}
      <span
        className={`px-3 py-1 text-sm font-medium rounded-full ${
          job.isClosed
            ? "bg-gray-200 text-gray-700"
            : "bg-green-200 text-green-700"
        }`}
      >
        {job.isClosed ? "Closed" : "Active"}
      </span>
    </div>
  );
};

export default JobDashboard;
