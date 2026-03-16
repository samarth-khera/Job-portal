// src/components/Cards/JobItemCard.jsx
import React from "react";
import { MapPin, Calendar, Trash2, Edit3 } from "lucide-react";

export default function JobItemCard({ job, onDelete }) {
  return (
    <div className="border rounded-xl bg-white shadow-sm p-4 md:p-5 flex flex-col gap-3 md:gap-4 transition-all hover:shadow-md">

      {/* Title + Action Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-3 md:gap-0">
        <div className="w-full md:w-auto">
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.category}</p>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto mt-2 md:mt-0">
          <button
            className="flex-1 md:flex-none justify-center px-4 py-2 md:px-3 md:py-1 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center gap-1 text-sm font-medium transition-colors"
            onClick={() => alert("Edit page coming soon")}
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>

          <button
            className="flex-1 md:flex-none justify-center px-4 py-2 md:px-3 md:py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-md flex items-center gap-1 text-sm font-medium transition-colors"
            onClick={() => onDelete(job._id)}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Location & Date */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
        <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-md">
          <MapPin className="w-4 h-4 text-blue-500" />
          {job.location}
        </span>

        <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-md">
          <Calendar className="w-4 h-4 text-purple-500" />
          Posted {new Date(job.createdAt).toDateString().slice(4)}
        </span>
      </div>

      {/* Description Short */}
      <p className="text-gray-700 text-sm line-clamp-2 mt-1">
        {job.description}
      </p>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm text-gray-500 pt-3 border-t mt-1">
        <span className="font-medium text-gray-700">Type: <span className="font-normal text-gray-600">{job.type}</span></span>
        <span className="font-medium text-gray-700">
          Salary:{" "}
          <span className="font-normal text-green-600">
            {job.salaryMin && job.salaryMax
              ? `₹${job.salaryMin} - ₹${job.salaryMax}`
              : "Not specified"}
          </span>
        </span>
      </div>
    </div>
  );
}
