import React from "react";
import { Link } from "react-router-dom";
import { Bookmark, BookmarkCheck } from "lucide-react";

export default function JobCard({ job }) {
  return (
    <div className="border rounded-xl shadow-sm p-5 bg-white hover:shadow-md transition">
      {/* Top Info */}
      <div className="flex items-center gap-3">
        <img
          src={job.company?.companyLogo || "/default-company.png"}
          alt="logo"
          className="w-12 h-12 rounded-lg object-cover border"
        />
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-gray-600 text-sm">{job.company?.companyName}</p>
        </div>
      </div>

      {/* Job Details */}
      <div className="mt-3 text-sm text-gray-700">
        <p>📍 {job.location || "Not specified"}</p>
        <p>💼 {job.category}</p>
        <p>🕒 {job.type}</p>

        {(job.salaryMin || job.salaryMax) && (
          <p className="mt-1 font-medium text-blue-600">
            {job.salaryMin} - {job.salaryMax} / month
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-4">
        <Link
          to={`/job/${job._id}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          View Details
        </Link>

        <button className="text-gray-600 hover:text-blue-600">
          <Bookmark size={22} />
        </button>
      </div>
    </div>
  );
}
