import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, Briefcase, Building, X } from "lucide-react";

export default function EmployerSidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r flex flex-col shadow-lg md:shadow-none z-30 transition-transform duration-300 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

        <div className="px-6 py-5 border-b flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-blue-600">JobPortal</h1>
            <p className="text-sm text-gray-500">Employer</p>
          </div>
          
          {/* Close button for mobile */}
          <button 
            className="md:hidden p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-3 py-6 flex-1 space-y-1 overflow-y-auto">

          <NavLink
            to="/employer-dashboard"
            onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
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
    </>
  );
}
