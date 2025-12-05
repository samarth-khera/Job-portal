import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import LoadingSpinner from "../../components/LoadingSpinner";
import JobDashboard from "../../components/Cards/JobDashboard";
import { Briefcase, Users, CheckCircle } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";
import ApplicationDashboardCard from "../../components/Cards/ApplicationDashboardCard";

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    activeJobs: { count: 0, trend: 0 },
    totalApplicants: { count: 0, trend: 0 },
    hired: { count: 0, trend: 0 },
  });

  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);

  // ------------------------------------------------------
  // FETCH DASHBOARD OVERVIEW
  // ------------------------------------------------------
  const getDashboardOverView = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.ANALYTICS.OVERVIEW);
      const data = response.data;

      setStats({
        activeJobs: data.activeJobs,
        totalApplicants: data.totalApplicants,
        hired: data.hired,
      });

      setRecentJobs(data.recentJobs || []);
      setRecentApplications(data.recentApplications || []);
    } catch (error) {
      console.log("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardOverView();
  }, []);

  // ------------------------------------------------------
  // STAT CARD
  // ------------------------------------------------------
  const StatCard = ({ title, count, trend, icon: Icon, color }) => (
    <div className={`flex-1 p-6 rounded-xl text-white ${color}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <h3 className="text-3xl font-semibold mt-2">{count}</h3>
        </div>
        <Icon className="w-7 h-7 opacity-90" />
      </div>

      <p className="text-sm mt-4">
        <span className="font-semibold">{trend}%</span> from last week
      </p>
    </div>
  );

  return (
    <DashboardLayout activeMenu="employer-dashboard">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-7xl mx-auto space-y-6">

          {/* ------------------------------------------------------ */}
          {/* STATS CARDS */}
          {/* ------------------------------------------------------ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Active Jobs"
              count={stats.activeJobs.count}
              trend={stats.activeJobs.trend}
              icon={Briefcase}
              color="bg-gradient-to-r from-blue-500 to-blue-600"
            />

            <StatCard
              title="Total Applicants"
              count={stats.totalApplicants.count}
              trend={stats.totalApplicants.trend}
              icon={Users}
              color="bg-gradient-to-r from-green-500 to-green-600"
            />

            <StatCard
              title="Hired"
              count={stats.hired.count}
              trend={stats.hired.trend}
              icon={CheckCircle}
              color="bg-gradient-to-r from-purple-500 to-purple-600"
            />
          </div>

          {/* ------------------------------------------------------ */}
          {/* RECENT JOB POSTS */}
          {/* ------------------------------------------------------ */}
          <div className="bg-white border rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">Recent Job Posts</h3>
                <p className="text-gray-500 text-sm">
                  Your latest job postings
                </p>
              </div>

              <button
                className="text-blue-600 font-medium text-sm hover:underline"
                onClick={() => navigate("/manage-jobs")}
              >
                View all →
              </button>
            </div>

            {recentJobs.length === 0 ? (
              <p className="text-gray-500 text-sm italic">
                No recent job posts.
              </p>
            ) : (
              recentJobs.slice(0, 3).map((job) => (
                <JobDashboard key={job._id} job={job} />
              ))
            )}
          </div>

          {/* ------------------------------------------------------ */}
          {/* RECENT APPLICATIONS */}
          {/* ------------------------------------------------------ */}
          <div className="bg-white border rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">Recent Applications</h3>
                <p className="text-gray-500 text-sm">
                  Latest candidate applications
                </p>
              </div>

              <button
                className="text-blue-600 font-medium text-sm hover:underline"
                onClick={() => navigate("/manage-applications")}
              >
                View all →
              </button>
            </div>

            {recentApplications.length === 0 ? (
              <p className="text-gray-500 text-sm italic">
                No recent applications.
              </p>
            ) : (
              recentApplications.slice(0, 3).map((app, index) => (
                <ApplicationDashboardCard
                  key={index}
                  applicant={app.applicant || ""}
                  position={app.job?.title || ""}
                  timeAgo={app.createdAt}
                />
              ))
            )}
          </div>

          {/* ------------------------------------------------------ */}
          {/* QUICK ACTIONS (NEW SECTION YOU WANTED) */}
          {/* ------------------------------------------------------ */}
          <div className="bg-white border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              {/* Post New Job */}
              <button
                onClick={() => navigate("/post-job")}
                className="flex items-center justify-center py-3 border rounded-lg hover:bg-gray-50 transition"
              >
                <span className="mr-2 text-lg">📤</span>
                <span className="font-medium">Post New Job</span>
              </button>

              {/* Review Applications */}
              <button
                onClick={() => navigate("/manage-applications")}
                className="flex items-center justify-center py-3 border rounded-lg hover:bg-gray-50 transition"
              >
                <span className="mr-2 text-lg">📄</span>
                <span className="font-medium">Review Applications</span>
              </button>

              {/* Company Settings */}
              <button
                onClick={() => navigate("/employer-profile")}
                className="flex items-center justify-center py-3 border rounded-lg hover:bg-gray-50 transition"
              >
                <span className="mr-2 text-lg">⚙️</span>
                <span className="font-medium">Company Settings</span>
              </button>

            </div>
          </div>

        </div>
      )}
    </DashboardLayout>
  );
};

export default EmployerDashboard;
