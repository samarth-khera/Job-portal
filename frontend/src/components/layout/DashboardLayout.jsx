import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Menu } from "lucide-react";

import EmployerSidebar from "./EmployerSidebar";
import JobSeekerSidebar from "./JobSeekerSidebar";
import ProfileDropdown from "./ProfileDropdown";

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isEmployer = user?.role === "employer";
  const isJobSeeker = user?.role === "jobseeker";

  return (
    <div className="min-h-screen w-full flex bg-slate-50 items-start">

      {/* ==================== SIDEBAR ==================== */}
      {isEmployer && <EmployerSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}
      {isJobSeeker && <JobSeekerSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}

      {/* ==================== MAIN SECTION ==================== */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">

        {/* ============ HEADER ============ */}
        <header className="bg-white border-b px-4 md:px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            {/* Hamburger Menu Toggle (Mobile Only) */}
            <button 
              className="md:hidden p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                {isEmployer && "Employer Dashboard"}
                {isJobSeeker && "Job Seeker Dashboard"}
              </h2>

              <p className="hidden sm:block text-gray-500 text-sm">
                {isEmployer
                  ? "Manage your job posts and applications."
                  : "Find and apply for your dream job."}
              </p>
            </div>
          </div>

          <ProfileDropdown />
        </header>

        {/* ============ PAGE CONTENT ============ */}
        <main className="p-6 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
