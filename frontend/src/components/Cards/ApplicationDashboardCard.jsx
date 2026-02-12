import React from "react";

const ApplicationDashboardCard = ({ applicant, position, timeAgo }) => {
  const date = new Date(timeAgo).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  
  // Get initial for avatar placeholder
  const initial = applicant?.name ? applicant.name.charAt(0).toUpperCase() : "?";

  return (
    <div className="group flex items-center gap-4 p-4 mb-3 bg-white border border-gray-100 rounded-2xl hover:shadow-lg hover:shadow-indigo-500/5 hover:border-indigo-100 transition-all duration-300">
      {/* Avatar Placeholder */}
      <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg border border-indigo-100 group-hover:scale-110 transition-transform">
        {initial}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-gray-800 truncate group-hover:text-indigo-600 transition-colors">
          {applicant?.name || "Unknown Applicant"}
        </h4>
        <p className="text-sm text-gray-500 truncate">
          Applied for <span className="text-gray-700 font-medium">{position}</span>
        </p>
      </div>

      <div className="text-xs font-medium text-gray-400 whitespace-nowrap bg-gray-50 px-2 py-1 rounded-md">
        {date}
      </div>
    </div>
  );
};

export default ApplicationDashboardCard;
