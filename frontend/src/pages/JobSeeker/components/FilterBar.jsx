import React from "react";
import { SlidersHorizontal } from "lucide-react";

export default function FilterBar({ filters, setFilters }) {
  return (
    <div className="w-72 bg-white border border-slate-200 rounded-2xl shadow-sm h-fit sticky top-6">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <SlidersHorizontal size={18} /> Filters
        </h3>
        <button 
           onClick={() => setFilters({ keyword: "", location: "", category: "", type: "", salaryMin: 0, salaryMax: 500000 })}
           className="text-xs text-blue-600 font-semibold hover:underline"
        >
          Reset
        </button>
      </div>

      <div className="p-5 space-y-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
          <div className="relative">
            <select
              className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent cursor-pointer font-medium text-sm transition-all"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            >
              <option value="">All Categories</option>
              <option value="IT">IT & Software</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Job Type</label>
          <div className="relative">
            <select
              className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent cursor-pointer font-medium text-sm transition-all"
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
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* Salary Range */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-4">
             Salary Range <span className="text-slate-400 font-normal text-xs ml-1">(Monthly)</span>
          </label>
          <div className="px-1">
            <input
              type="range"
              min={0}
              max={500000}
              step={5000}
              value={filters.salaryMax}
              onChange={(e) =>
                setFilters({ ...filters, salaryMax: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
          <div className="flex justify-between items-center mt-3 text-sm">
             <span className="text-slate-500 font-medium">Up to:</span>
             <span className="font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                ${filters.salaryMax?.toLocaleString()}
             </span>
          </div>
        </div>
      </div>
    </div>
  );
}
