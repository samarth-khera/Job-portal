import React from "react";
import { NavLink } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Building,
} from "lucide-react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex bg-gray-50">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r flex flex-col">

        {/* LOGO AREA */}
        <div className="px-6 py-5 border-b">
          <h1 className="text-xl font-bold text-blue-600">JobPortal</h1>
          <p className="text-sm text-gray-500">Employer</p>
        </div>

        {/* NAVIGATION */}
        <nav className="px-3 py-6 flex-1 space-y-1">

          <NavLink
            to="/employer-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md text-sm ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </NavLink>

          <NavLink
            to="/post-job"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md text-sm ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <FileText className="w-5 h-5" />
            Post Job
          </NavLink>

          <NavLink
            to="/manage-jobs"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md text-sm ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Briefcase className="w-5 h-5" />
            Manage Jobs
          </NavLink>

          <NavLink
            to="/company-profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md text-sm ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Building className="w-5 h-5" />
            Company Profile
          </NavLink>

        </nav>

      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col">

        {/* TOP HEADER BAR */}
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome back!
            </h2>
            <p className="text-gray-500 text-sm">
              Here's what's happening with your jobs today.
            </p>
          </div>

          <ProfileDropdown />
        </header>

        {/* PAGE CONTENT */}
        <main className="p-6 flex-1">
          <div className="bg-white p-6 rounded-lg border min-h-[60vh]">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
