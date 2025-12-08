import React from "react";

export default function FilterBar({ filters, setFilters }) {
  return (
    <div className="w-64 p-4 bg-white border rounded-xl shadow-sm h-fit">
      <h3 className="font-semibold text-lg mb-3">Filters</h3>

      {/* Category */}
      <label className="block text-sm font-medium">Category</label>
      <select
        className="w-full border px-2 py-2 rounded mb-4"
        value={filters.category}
        onChange={(e) =>
          setFilters({ ...filters, category: e.target.value })
        }
      >
        <option value="">All</option>
        <option value="IT">IT</option>
        <option value="Finance">Finance</option>
        <option value="Marketing">Marketing</option>
        <option value="Design">Design</option>
      </select>

      {/* Job Type */}
      <label className="block text-sm font-medium">Job Type</label>
      <select
        className="w-full border px-2 py-2 rounded mb-4"
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
      >
        <option value="">All Types</option>
        <option value="Full-Time">Full-Time</option>
        <option value="Part-Time">Part-Time</option>
        <option value="Internship">Internship</option>
        <option value="Remote">Remote</option>
        <option value="Contract">Contract</option>
      </select>

      {/* Salary Range */}
      <label className="block text-sm font-medium">Salary Range</label>
      <input
        type="range"
        min={0}
        max={500000}
        value={filters.salaryMax}
        onChange={(e) =>
          setFilters({ ...filters, salaryMax: parseInt(e.target.value) })
        }
        className="w-full mt-2"
      />
      <p className="text-xs text-gray-600 mt-1">
        Up to: <span className="font-semibold">{filters.salaryMax}</span>
      </p>
    </div>
  );
}
