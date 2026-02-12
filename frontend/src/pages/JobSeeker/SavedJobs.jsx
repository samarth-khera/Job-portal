import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import DashboardLayout from "../../components/layout/DashboardLayout";
import JobCard from "./components/JobCard";
import { ArrowLeft, BookmarkX, Trash2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

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
      setTimeout(() => setLoading(false), 300);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  // ------------------------------
  // Remove saved job
  // ------------------------------
  const removeJob = async (jobId) => {
    if (!window.confirm("Remove this job from your saved list?")) return;
    
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
        <div className="flex h-[80vh] items-center justify-center">
           <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent animate-spin rounded-full"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header (Sunrise Gradient) */}
        <div className="mb-10 rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-white p-8 relative">
           <div className="absolute top-0 right-0 p-8 opacity-20">
             <BookmarkX size={150} />
           </div>
           
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div>
                <button
                   onClick={() => navigate(-1)}
                   className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors font-bold text-sm bg-white/10 w-fit px-3 py-1 rounded-lg"
                 >
                   <ArrowLeft size={16} /> Back
                </button>
                <h1 className="text-3xl font-extrabold tracking-tight">Saved Jobs</h1>
                <p className="text-orange-50 mt-1 text-lg opacity-90">Your curated list of potential opportunities.</p>
              </div>

              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/30 text-center min-w-[120px]">
                 <p className="text-xs font-bold uppercase tracking-wider opacity-80">Saved</p>
                 <p className="text-3xl font-extrabold">{savedJobs.length}</p>
              </div>
           </div>
        </div>

        {/* Content */}
        {savedJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm">
             <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                <BookmarkX className="text-orange-300" size={40} />
             </div>
             <h3 className="text-xl font-bold text-slate-900">No saved jobs yet</h3>
             <p className="text-slate-500 mt-2 max-w-sm text-center">
               Jobs you bookmark will appear here. Start your search to find your next career move.
             </p>
             <Link 
               to="/find-jobs"
               className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-200 transition-all active:scale-95"
             >
               Find Jobs
             </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {savedJobs.map((job) => (
              <div key={job._id} className="relative group/saved">
                {/* JobCard */}
                <JobCard job={job} />

                {/* Remove Button Overlay */}
                <div className="absolute top-4 right-4 z-10">
                   <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigating to job details if nested
                      e.stopPropagation();
                      removeJob(job._id);
                    }}
                    className="p-2.5 bg-white text-slate-400 border border-slate-200 rounded-full shadow-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all transform hover:scale-105"
                    title="Remove from saved"
                  >
                    <Trash2 size={18} />
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
