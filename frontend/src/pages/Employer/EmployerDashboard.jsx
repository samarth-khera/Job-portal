import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import LoadingSpinner from "../../components/LoadingSpinner";
import JobDashboard from "../../components/Cards/JobDashboard";
import { Briefcase, Users, CheckCircle, TrendingUp, Plus, ArrowRight, Settings } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";
import ApplicationDashboardCard from "../../components/Cards/ApplicationDashboardCard";
import { motion } from "framer-motion";

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
  // Helper to navigate to applicants page for a job
  // ------------------------------------------------------
  const goToApplicantsForJob = (jobId) => {
    if (!jobId) {
      alert("No job available to review applications.");
      return;
    }
    navigate(`/applicants?jobId=${jobId}`);
  };

  // ------------------------------------------------------
  // STAT CARD
  // ------------------------------------------------------
  const StatCard = ({ title, count, trend, icon: Icon, color, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      className="relative overflow-hidden p-6 rounded-2xl bg-white border border-gray-100 shadow-xl shadow-gray-200/50 group hover:-translate-y-1 transition-transform duration-300"
    >
      <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity`}>
        <Icon className={`w-24 h-24 ${color.text}`} />
      </div>

      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-xl ${color.bg} flex items-center justify-center mb-4`}>
          <Icon className={`w-6 h-6 ${color.text}`} />
        </div>
        
        <p className="text-gray-500 text-sm font-medium tracking-wide uppercase">{title}</p>
        <h3 className="text-4xl font-bold text-gray-800 mt-1 mb-2">{count}</h3>
        
        <div className="flex items-center gap-2 text-sm">
          <span className={`inline-flex items-center gap-1 font-semibold ${trend >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
            <TrendingUp className="w-4 h-4" />
            {Math.abs(trend)}%
          </span>
          <span className="text-gray-400">vs last month</span>
        </div>
      </div>
    </motion.div>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <DashboardLayout activeMenu="employer-dashboard">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* HEADER SECTION */}
          <header className="mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-between items-end"
            >
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
                <p className="text-gray-500 mt-2">Welcome back! Here's what's happening with your job postings today.</p>
              </div>
              <p className="text-sm font-medium text-gray-500 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </motion.div>
          </header>

          {/* STATS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <StatCard
              title="Active Jobs"
              count={stats.activeJobs.count}
              trend={stats.activeJobs.trend}
              icon={Briefcase}
              color={{ bg: 'bg-blue-50', text: 'text-blue-600' }}
              delay={0.1}
            />

            <StatCard
              title="Total Applicants"
              count={stats.totalApplicants.count}
              trend={stats.totalApplicants.trend}
              icon={Users}
              color={{ bg: 'bg-purple-50', text: 'text-purple-600' }}
              delay={0.2}
            />

            <StatCard
              title="Hired Candidates"
              count={stats.hired.count}
              trend={stats.hired.trend}
              icon={CheckCircle}
              color={{ bg: 'bg-emerald-50', text: 'text-emerald-600' }}
              delay={0.3}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* LEFT COLUMN (2/3 width) */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2 space-y-6 md:space-y-8"
            >
              
              {/* RECENT APPLICATIONS */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Recent Applications</h3>
                    <p className="text-gray-500 text-sm mt-1">Review your latest candidates</p>
                  </div>
                  <button
                    className="text-indigo-600 font-semibold text-sm hover:text-indigo-700 hover:underline flex items-center gap-1 transition-colors"
                    onClick={() => {
                        const firstJobId = recentJobs[0]?._id;
                        if (firstJobId) {
                          navigate(`/applicants?jobId=${firstJobId}`);
                        } else {
                          navigate("/applicants");
                        }
                      }}
                  >
                    View All Applicants <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {recentApplications.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-400">No applications yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentApplications.slice(0, 4).map((app, index) => (
                      <ApplicationDashboardCard
                        key={index}
                        applicant={app.applicant || ""}
                        position={app.job?.title || ""}
                        timeAgo={app.createdAt}
                      />
                    ))}
                  </div>
                )}
              </div>

               {/* RECENT JOBS */}
               <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Recent Job Posts</h3>
                    <p className="text-gray-500 text-sm mt-1">Manage your active listings</p>
                  </div>
                  <button
                    className="text-blue-600 font-semibold text-sm hover:text-blue-700 hover:underline flex items-center gap-1 transition-colors"
                    onClick={() => navigate("/manage-jobs")}
                  >
                    Manage All Jobs <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {recentJobs.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <p className="text-gray-500 mb-4">You haven't posted any jobs yet.</p>
                    <button 
                      onClick={() => navigate("/post-job")}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                    >
                      Post Your First Job
                    </button>
                  </div>
                ) : (
                  <div>
                    {recentJobs.slice(0, 3).map((job) => (
                      <JobDashboard key={job._id} job={job} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* RIGHT COLUMN (1/3 width) - Quick Actions & Mini Widgets */}
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.4 }}
               className="space-y-6"
            >
              
              {/* QUICK ACTIONS CARD */}
              <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl p-6 text-white shadow-xl shadow-indigo-900/20">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => navigate("/post-job")}
                    className="w-full flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm border border-white/10 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Plus className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                        <span className="block font-semibold">Post a New Job</span>
                        <span className="text-xs text-blue-200">Create a new listing</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => {
                        const firstJobId = recentJobs[0]?._id;
                        if (!firstJobId) {
                          alert("No recent job found to review applications.");
                          return;
                        }
                        goToApplicantsForJob(firstJobId);
                      }}
                    className="w-full flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm border border-white/10 group"
                  >
                     <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                        <span className="block font-semibold">Review Applicants</span>
                        <span className="text-xs text-purple-200">Check pending applications</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => navigate("/company-profile")}
                    className="w-full flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm border border-white/10 group"
                  >
                     <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Settings className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                        <span className="block font-semibold">Company Settings</span>
                        <span className="text-xs text-emerald-200">Update your profile</span>
                    </div>
                  </button>
                </div>
              </div>

               {/* RECRUITMENT TIPS OR PROMO */}
               <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                  <h4 className="font-bold text-orange-800 mb-2">Pro Tip</h4>
                  <p className="text-sm text-orange-700 leading-relaxed">
                    Detailed job descriptions attract 3x more qualified candidates. Make sure to include requirements and benefits!
                  </p>
               </div>

            </motion.div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default EmployerDashboard;
