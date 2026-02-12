import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Bookmark, BookmarkCheck, MapPin, Briefcase, DollarSign, Clock, Building2, ChevronLeft, Share2 } from "lucide-react";

export default function JobDetails() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  // ======================================================
  // FETCH JOB DETAILS
  // ======================================================
  const fetchJobDetails = async () => {
    try {
      const res = await axios.get(API_PATHS.JOBS.GET_JOB_BY_ID(jobId));
      setJob(res.data);

      // If backend includes info whether applied/saved,
      // set state accordingly (optional)
      setIsSaved(res.data.isSaved || false);
      setIsApplied(res.data.isApplied || false);

    } catch (err) {
      console.error(err);
      alert("Failed to load job details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  // ======================================================
  // APPLY TO JOB
  // ======================================================
  const handleApply = async () => {
    try {
      await axios.post(API_PATHS.APPLICATIONS.APPLY_TO_JOB(jobId));
      setIsApplied(true);
      alert("Application submitted successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "You may have already applied.");
    }
  };

  // ======================================================
  // SAVE / UNSAVE JOB
  // ======================================================
  const handleSave = async () => {
    try {
      if (isSaved) {
        await axios.delete(API_PATHS.SAVED_JOBS.UNSAVE_JOB(jobId));
        setIsSaved(false);
        alert("Job removed from saved list");
      } else {
        await axios.post(API_PATHS.SAVED_JOBS.SAVE_JOB(jobId));
        setIsSaved(true);
        alert("Job saved!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update saved jobs");
    }
  };

  // ======================================================
  // RENDER
  // ======================================================
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-[80vh] items-center justify-center">
           <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!job) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
           <p className="text-slate-900 font-bold text-xl mb-2">Job not found.</p>
           <Link to="/find-jobs" className="text-blue-600 hover:underline">Back to Jobs</Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/find-jobs" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-6 transition-colors font-medium">
           <ChevronLeft size={20} className="mr-1" /> Back to Jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* MAIN CONTENT (Left Column) */}
           <div className="lg:col-span-2 space-y-6">
              
              {/* HEADER CARD */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50 z-0"></div>
                 
                 <div className="relative z-10 flex flex-col md:flex-row gap-6 mt-4">
                    <div className="w-24 h-24 rounded-2xl border-2 border-white bg-white shadow-sm flex-shrink-0 flex items-center justify-center overflow-hidden">
                       {job.company?.companyLogo ? (
                         <img src={job.company.companyLogo} alt="company" className="w-full h-full object-cover" />
                       ) : (
                         <Building2 className="w-10 h-10 text-slate-300" />
                       )}
                    </div>
                    
                    <div className="flex-1">
                       <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-2">{job.title}</h1>
                       <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600">
                          <span className="flex items-center gap-1.5"><Building2 size={16} className="text-blue-500" /> {job.company?.companyName}</span>
                          <span className="flex items-center gap-1.5"><MapPin size={16} className="text-blue-500" /> {job.location || "Remote"}</span>
                          <span className="flex items-center gap-1.5"><Clock size={16} className="text-blue-500" /> {job.type}</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* DESCRIPTION */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                 <h3 className="text-xl font-bold text-slate-900 mb-4">Job Description</h3>
                 <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
                    {job.description}
                 </div>

                 <div className="my-8 border-t border-slate-100"></div>

                 <h3 className="text-xl font-bold text-slate-900 mb-4">Requirements</h3>
                 <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
                    {job.requirements}
                 </div>
              </div>
           </div>

           {/* SIDEBAR (Right Column) */}
           <div className="space-y-6">
              {/* ACTION CARD */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm sticky top-24">
                 <h3 className="font-bold text-slate-900 mb-4 text-lg">Job Overview</h3>
                 
                 <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                       <div className="bg-white p-2 rounded-lg shadow-sm text-green-600"><DollarSign size={20} /></div>
                       <div>
                          <p className="text-xs text-slate-500 font-bold uppercase">Salary</p>
                          <p className="text-sm font-bold text-slate-900">
                            {job.salaryMin && job.salaryMax ? `$${job.salaryMin} - $${job.salaryMax}` : "Competitive"}
                          </p>
                       </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                       <div className="bg-white p-2 rounded-lg shadow-sm text-purple-600"><Briefcase size={20} /></div>
                       <div>
                          <p className="text-xs text-slate-500 font-bold uppercase">Job Type</p>
                          <p className="text-sm font-bold text-slate-900">{job.type}</p>
                       </div>
                    </div>

                     <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                       <div className="bg-white p-2 rounded-lg shadow-sm text-orange-600"><MapPin size={20} /></div>
                       <div>
                          <p className="text-xs text-slate-500 font-bold uppercase">Location</p>
                          <p className="text-sm font-bold text-slate-900">{job.location || "Remote"}</p>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <button
                      onClick={handleApply}
                      disabled={isApplied}
                      className={`w-full py-3.5 rounded-xl font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2
                        ${isApplied 
                          ? "bg-green-100 text-green-700 cursor-not-allowed" 
                          : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200"}`
                      }
                    >
                      {isApplied ? "Application Sent" : "Apply Now"}
                    </button>

                    <button
                      onClick={handleSave}
                      className={`w-full py-3.5 rounded-xl font-bold border transition-all active:scale-95 flex items-center justify-center gap-2
                        ${isSaved 
                          ? "bg-blue-50 border-blue-200 text-blue-600" 
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"}`
                      }
                    >
                      {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                      {isSaved ? "Saved to Jobs" : "Save Job"}
                    </button>
                 </div>
              </div>

               {/* SHARE CARD (Optional) */}
               <div className="bg-slate-900 rounded-2xl p-6 text-white text-center shadow-lg">
                  <h4 className="font-bold text-lg mb-2">Share this Job</h4>
                  <p className="text-slate-400 text-sm mb-4">Know someone who would be a perfect fit?</p>
                  <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2">
                     <Share2 size={16} /> Copy Link
                  </button>
               </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
