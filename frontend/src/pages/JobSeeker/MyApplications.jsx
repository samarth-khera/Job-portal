import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axios from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch applications
  const fetchApplications = async () => {
    try {
      const res = await axios.get(API_PATHS.APPLICATIONS.GET_ALL_APPLICATIONS);
      setApplications(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Badge UI based on status
  const getStatusBadge = (status) => {
    if (!status) return null;

    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";

    switch (status.toLowerCase()) {
      case "accepted":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-700`}>
            Accepted
          </span>
        );
      case "rejected":
        return (
          <span className={`${baseClasses} bg-red-100 text-red-600`}>
            Rejected
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-600`}>
            Pending
          </span>
        );
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-center text-gray-500 mt-10">Loading applications...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6">My Applications</h1>

        {applications.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">No applications found.</p>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="border rounded-xl p-5 bg-white flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold">{app.job?.title}</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Applied: {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* STATUS BADGE */}
                <div className="flex items-center gap-4">
                  {getStatusBadge(app.status)}

                  {/* View Button */}
                  <button
                    onClick={() => navigate(`/application/${app._id}`)}
                    className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-50"
                  >
                    <FileText size={18} />
                    View Application
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
