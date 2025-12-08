import React from "react";
import { NavLink } from "react-router-dom";
import { Search, Bookmark, User, FileText } from "lucide-react";

export default function JobSeekerSidebar() {
  return (
    <aside className="w-64 bg-white border-r flex flex-col">

      <div className="px-6 py-5 border-b">
        <h1 className="text-xl font-bold text-purple-600">JobPortal</h1>
        <p className="text-sm text-gray-500">Job Seeker</p>
      </div>

      <nav className="px-3 py-6 flex-1 space-y-1">

        {/* FIND JOBS */}
        <NavLink
          to="/find-jobs"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-md ${
              isActive
                ? "bg-purple-50 text-purple-600 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <Search size={20} /> Find Jobs
        </NavLink>

        {/* SAVED JOBS */}
        <NavLink
          to="/saved-jobs"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-md ${
              isActive
                ? "bg-purple-50 text-purple-600 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <Bookmark size={20} /> Saved Jobs
        </NavLink>

        {/* MY APPLICATIONS (NEW) */}
        <NavLink
          to="/my-applications"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-md ${
              isActive
                ? "bg-purple-50 text-purple-600 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <FileText size={20} /> My Applications
        </NavLink>

        {/* PROFILE */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-md ${
              isActive
                ? "bg-purple-50 text-purple-600 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <User size={20} /> Profile
        </NavLink>
      </nav>
    </aside>
  );
}
