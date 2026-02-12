import React from "react";
import { Search, MapPin } from "lucide-react";

export default function SearchBar({ filters, setFilters }) {
  return (
    <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search by job title, keywords, or company..."
          value={filters.keyword}
          onChange={(e) =>
            setFilters({ ...filters, keyword: e.target.value })
          }
          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-transparent border-none focus:ring-2 focus:ring-blue-100 focus:bg-slate-50 transition-all font-medium text-slate-700 placeholder:text-slate-400 outline-none"
        />
      </div>

      <div className="hidden md:block w-px bg-slate-200 my-2"></div>

      <div className="relative md:w-80">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Location (e.g. New York, Remote)"
          value={filters.location}
          onChange={(e) =>
            setFilters({ ...filters, location: e.target.value })
          }
          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-transparent border-none focus:ring-2 focus:ring-blue-100 focus:bg-slate-50 transition-all font-medium text-slate-700 placeholder:text-slate-400 outline-none"
        />
      </div>
      
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95">
        Search
      </button>
    </div>
  );
}
