import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import DashboardLayout from "../../components/layout/DashboardLayout";
import JobCard from "./components/JobCard";
import { ArrowLeft, BookmarkX } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SavedJobs() {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ------------------------------
  // Fetch Saved Jobs
  // ------------------------------
  const fetchSavedJobs = async () => {
    try {
      const res = await axios.get(API_PATHS.SAVED_JOBS.GET_SAVED_JOBS);

      // API response may be: [{ job: {...} }]
      const jobs = res.data.map((i) => i.job || i);

      setSavedJobs(jobs);
    } catch (err) {
      console.error(err);
      alert("Failed to load saved jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  // ------------------------------
  // Remove saved job
  // ------------------------------
  const removeJob = async (jobId) => {
    try {
      await axios.delete(API_PATHS.SAVED_JOBS.UNSAVE_JOB(jobId));
      setSavedJobs(savedJobs.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error(err);
      alert("Failed to remove job");
    }
  };

  // ------------------------------
  // Loading State
  // ------------------------------
  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-center text-gray-500 mt-10">Loading saved jobs...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Top Gradient Header */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white p-6 rounded-b-2xl shadow-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <h1 className="text-2xl font-semibold">Saved Jobs</h1>

          <div></div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto p-6">
        {savedJobs.length === 0 ? (
          <div className="text-center mt-20 text-gray-500">
            <p>No saved jobs yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedJobs.map((job) => (
              <div key={job._id} className="relative">

                {/* JobCard */}
                <JobCard job={job} />

                {/* Remove Button */}
                <button
                  onClick={() => removeJob(job._id)}
                  className="absolute top-3 right-3 p-2 bg-white border rounded-full shadow hover:bg-red-50"
                >
                  <BookmarkX size={18} className="text-red-500" />
                </button>

              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
