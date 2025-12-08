// src/components/Cards/JobItemCard.jsx
import React from "react";
import { MapPin, Calendar, Trash2, Edit3 } from "lucide-react";

export default function JobItemCard({ job, onDelete }) {
  return (
    <div className="border rounded-xl bg-white shadow-sm p-5 flex flex-col gap-3">

      {/* Title + Action Buttons */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.category}</p>
        </div>

        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center gap-1 text-sm"
            onClick={() => alert("Edit page coming soon")}
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>

          <button
            className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-md flex items-center gap-1 text-sm"
            onClick={() => onDelete(job._id)}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Location & Date */}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {job.location}
        </span>

        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          Posted {new Date(job.createdAt).toDateString().slice(4)}
        </span>
      </div>

      {/* Description Short */}
      <p className="text-gray-700 text-sm line-clamp-2">
        {job.description}
      </p>

      {/* Footer */}
      <div className="flex justify-between text-sm text-gray-500 pt-3 border-t">
        <span>Type: {job.type}</span>
        <span>
          Salary:{" "}
          {job.salaryMin && job.salaryMax
            ? `₹${job.salaryMin} - ₹${job.salaryMax}`
            : "Not specified"}
        </span>
      </div>
    </div>
  );
}
