import React from "react";

export default function SearchBar({ filters, setFilters }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border flex gap-4 items-center">
      <input
        type="text"
        placeholder="Job title, keywords..."
        value={filters.keyword}
        onChange={(e) =>
          setFilters({ ...filters, keyword: e.target.value })
        }
        className="flex-1 border px-3 py-2 rounded"
      />

      <input
        type="text"
        placeholder="Location"
        value={filters.location}
        onChange={(e) =>
          setFilters({ ...filters, location: e.target.value })
        }
        className="w-60 border px-3 py-2 rounded"
      />
    </div>
  );
}
