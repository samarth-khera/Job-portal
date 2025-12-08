import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, Briefcase, Building } from "lucide-react";

export default function EmployerSidebar() {
  return (
    <aside className="w-64 bg-white border-r flex flex-col">

      <div className="px-6 py-5 border-b">
        <h1 className="text-xl font-bold text-blue-600">JobPortal</h1>
        <p className="text-sm text-gray-500">Employer</p>
      </div>

      <nav className="px-3 py-6 flex-1 space-y-1">

        <NavLink
          to="/employer-dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-md ${
              isActive ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>

        <NavLink
          to="/post-job"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-md ${
              isActive ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <FileText size={20} /> Post Job
        </NavLink>

        <NavLink
          to="/manage-jobs"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-md ${
              isActive ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <Briefcase size={20} /> Manage Jobs
        </NavLink>

        <NavLink
          to="/company-profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-md ${
              isActive ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <Building size={20} /> Company Profile
        </NavLink>

      </nav>
    </aside>
  );
}
