import React from "react";
import { useAuth } from "../../context/AuthContext";

import EmployerSidebar from "./EmployerSidebar";
import JobSeekerSidebar from "./JobSeekerSidebar";
import ProfileDropdown from "./ProfileDropdown";

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();

  const isEmployer = user?.role === "employer";
  const isJobSeeker = user?.role === "jobseeker";

  return (
    <div className="min-h-screen w-full flex bg-gray-50">

      {/* ==================== SIDEBAR ==================== */}
      {isEmployer && <EmployerSidebar />}
      {isJobSeeker && <JobSeekerSidebar />}

      {/* ==================== MAIN SECTION ==================== */}
      <div className="flex-1 flex flex-col">

        {/* ============ HEADER ============ */}
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {isEmployer && "Employer Dashboard"}
              {isJobSeeker && "Job Seeker Dashboard"}
            </h2>

            <p className="text-gray-500 text-sm">
              {isEmployer
                ? "Manage your job posts and applications."
                : "Find and apply for your dream job."}
            </p>
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
