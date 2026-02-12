import React from "react";
import { NavLink } from "react-router-dom";
import { Search, Bookmark, User, FileText, Briefcase } from "lucide-react";

export default function JobSeekerSidebar() {
  const navItems = [
    { name: "Find Jobs", path: "/find-jobs", icon: Search },
    { name: "Saved Jobs", path: "/saved-jobs", icon: Bookmark },
    { name: "My Applications", path: "/my-applications", icon: FileText },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 shadow-sm z-10">
      <div className="px-8 py-6 border-b border-slate-100 flex items-center gap-2">
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <Briefcase className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">JobPortal</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Job Seeker</p>
        </div>
      </div>

      <nav className="px-4 py-6 flex-1 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
             {({ isActive }) => (
               <>
                 <item.icon
                   size={20}
                   className={`transition-colors ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`}
                 />
                 {item.name}
               </>
             )}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-slate-100">
         <div className="bg-slate-50 rounded-xl p-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Need Help?</h4>
            <p className="text-xs text-slate-500 mb-3">Check our documentation or contact support.</p>
            <button className="text-xs font-semibold text-blue-600 hover:underline">Contact Support</button>
         </div>
      </div>
    </aside>
  );
}
