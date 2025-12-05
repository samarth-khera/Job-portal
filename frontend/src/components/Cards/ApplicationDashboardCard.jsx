import React from "react";

const ApplicationDashboardCard = ({ applicant, position, timeAgo }) => {
  const date = new Date(timeAgo).toLocaleDateString();

  return (
    <div className="border rounded-lg p-4 mb-3 bg-gray-50 hover:bg-gray-100 transition">
      <h4 className="font-semibold text-md">{position}</h4>

      <p className="text-sm text-gray-600 mt-1">
        Applicant: {applicant?.name || "Unknown"}
      </p>

      <p className="text-xs text-gray-500 mt-2">
        Applied on: {date}
      </p>
    </div>
  );
};

export default ApplicationDashboardCard;
