import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";

export default function ApplicationDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.ANALYTICS.OVERVIEW);
      setAnalytics(res.data);
    } catch (err) {
      console.error("Failed to load analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;

  if (!analytics)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load analytics.
      </p>
    );

  const { activeJobs, totalApplicants, hired, recentJobs } = analytics;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-2">Welcome back!</h2>
      <p className="text-gray-600 mb-6">
        Here's what's happening with your jobs today.
      </p>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-600 text-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-medium">Active Jobs</h3>
          <p className="text-4xl font-bold mt-2">{activeJobs.count}</p>
          <p className="mt-1 text-sm">{activeJobs.trend}% from last week</p>
        </div>

        <div className="bg-green-600 text-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-medium">Total Applicants</h3>
          <p className="text-4xl font-bold mt-2">{totalApplicants.count}</p>
          <p className="mt-1 text-sm">
            {totalApplicants.trend}% from last week
          </p>
        </div>

        <div className="bg-purple-600 text-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-medium">Hired</h3>
          <p className="text-4xl font-bold mt-2">{hired.count}</p>
          <p className="mt-1 text-sm">{hired.trend}% from last week</p>
        </div>
      </div>

      {/* RECENT JOB POSTS */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="flex justify-between mb-3">
          <h3 className="text-lg font-semibold">Recent Job Posts</h3>
          <a href="/manage-jobs" className="text-blue-600 text-sm">
            View all →
          </a>
        </div>

        {recentJobs.length === 0 ? (
          <p className="text-gray-500">No recent jobs.</p>
        ) : (
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div
                key={job._id}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{job.title}</p>
                  <p className="text-gray-500 text-sm">
                    Posted: {new Date(job.createdAt).toDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    job.isClosed
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {job.isClosed ? "Closed" : "Active"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RECENT APPLICATIONS */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between mb-3">
          <h3 className="text-lg font-semibold">Recent Applications</h3>
          <a href="/manage-applications" className="text-blue-600 text-sm">
            View all →
          </a>
        </div>

        <p className="text-gray-500">No recent applications.</p>
      </div>
    </div>
  );
}
