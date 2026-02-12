import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axios from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import { Edit, Trash2, XCircle, CheckCircle, Users, Search, Filter, MoreVertical, Plus, Briefcase, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, active, closed
  
  const navigate = useNavigate();

  // Fetch employer’s posted jobs
  const fetchJobs = async () => {
    try {
      const res = await axios.get(API_PATHS.JOBS.GET_JOBS_EMPLOYER);
      setJobs(res.data);
      setFilteredJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      // alert("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = jobs;

    // 1. Search filter
    if (searchTerm) {
      const lowerIds = searchTerm.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(lowerIds) || 
        job.location?.toLowerCase().includes(lowerIds)
      );
    }

    // 2. Status filter
    if (filterStatus !== "all") {
        const isClosed = filterStatus === "closed";
        result = result.filter(job => job.isClosed === isClosed);
    }

    setFilteredJobs(result);
  }, [searchTerm, filterStatus, jobs]);


  // Delete job
  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job? This action cannot be undone.")) return;

    try {
      await axios.delete(API_PATHS.JOBS.DELETE_JOB(id));
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch {
      alert("Failed to delete job");
    }
  };

  // Toggle open/close
  const toggleJobStatus = async (id, currentStatus) => {
    try {
      const res = await axios.put(API_PATHS.JOBS.TOGGLE_CLOSE(id));
      const updated = res.data;

      setJobs((prev) =>
        prev.map((job) => (job._id === id ? updated : job))
      );
    } catch {
      alert("Failed to update job status");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* HEADER & ACTIONS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Manage Jobs</h1>
                <p className="text-gray-500 text-sm mt-1">Track, edit, and manage your job listings.</p>
            </div>
            <button 
                onClick={() => navigate("/post-job")}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
            >
                <Plus size={18} /> Post New Job
            </button>
        </div>

        {/* FILTERS & SEARCH */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                    type="text" 
                    placeholder="Search by job title or location..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter size={18} className="text-gray-400" />
                <span className="text-sm text-gray-500 font-medium">Status:</span>
                <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none"
                >
                    <option value="all">All Jobs</option>
                    <option value="active">Active</option>
                    <option value="closed">Closed</option>
                </select>
            </div>
        </div>

        {/* JOBS LIST */}
        <div className="space-y-4">
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            ) : filteredJobs.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
                    <p className="text-gray-500 text-sm mt-1">Try adjusting your filters or post a new job.</p>
                </div>
            ) : (
                <AnimatePresence>
                    {filteredJobs.map((job) => (
                        <motion.div 
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            key={job._id} 
                            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow group flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                        >
                            {/* LEFT: INFO */}
                            <div className="flex items-start gap-4 flex-1">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${job.isClosed ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-600'}`}>
                                    <Briefcase size={24} />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                        <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium text-gray-600">{job.type}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1"><Calendar size={14}/> {new Date(job.createdAt).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span>{job.location}</span>
                                    </div>
                                </div>
                            </div>

                            {/* MIDDLE: METRICS */}
                            <div className="flex items-center gap-6 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 md:mr-4 w-full md:w-auto justify-between md:justify-start">
                                <div className="text-center md:text-left">
                                    <p className="text-xs text-gray-500 font-medium uppercase">Applicants</p>
                                    <p className="text-lg font-bold text-gray-800">{job.applicantsCount || 0}</p>
                                </div>
                                <div className="w-px h-8 bg-gray-200"></div>
                                <button 
                                    onClick={() => navigate(`/applicants?jobId=${job._id}`)}
                                    className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
                                >
                                    View Candidates <Users size={14}/>
                                </button>
                            </div>

                            {/* RIGHT: ACTIONS */}
                            <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0">
                                <button 
                                    onClick={() => toggleJobStatus(job._id, job.isClosed)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${job.isClosed ? 'bg-green-50 text-green-700 hover:bg-green-100' : 'bg-orange-50 text-orange-700 hover:bg-orange-100'}`}
                                >
                                    {job.isClosed ? <CheckCircle size={16}/> : <XCircle size={16}/>}
                                    {job.isClosed ? "Reopen" : "Close"}
                                </button>

                                <button 
                                    onClick={() => navigate(`/post-job?id=${job._id}`)}
                                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                                    title="Edit Job"
                                >
                                    <Edit size={18} />
                                </button>

                                <button 
                                    onClick={() => deleteJob(job._id)}
                                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete Job"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                        </motion.div>
                    ))}
                </AnimatePresence>
            )}
        </div>
      </div>
    </DashboardLayout>
  );
}
