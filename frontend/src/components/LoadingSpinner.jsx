import React from "react";
import { Briefcase } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">

      {/* Animated Circle */}
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-400 border-t-transparent"></div>

        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Briefcase className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      {/* Text */}
      <p className="text-gray-600 font-medium mt-4">
        Finding amazing opportunities...
      </p>
    </div>
  );
};

export default LoadingSpinner;
