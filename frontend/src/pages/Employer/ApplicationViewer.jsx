import React, { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axios from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ArrowLeft, User2, Mail, Calendar, Briefcase, Download, ExternalLink } from "lucide-react";

export default function ApplicantsViewer() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const jobId = searchParams.get("jobId");

  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      if (!jobId) return alert("Invalid Job ID");

      const jobRes = await axios.get(API_PATHS.JOBS.GET_JOB_BY_ID(jobId));
      setJob(jobRes.data);

      const appRes = await axios.get(
        API_PATHS.APPLICATIONS.GET_APPLICANTS_FOR_JOB(jobId)
      );

      setApplicants(appRes.data.reverse());
    } catch (err) {
      console.error(err);
      // alert("Failed to load applicants."); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [jobId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto pb-12">
        
        {/* HEADER */}
        <div className="mb-8">
            <button
            className="flex items-center gap-2 text-gray-500 mb-4 hover:text-blue-600 transition-colors"
            onClick={() => navigate(-1)}
            >
            <ArrowLeft size={18} /> Back to Jobs
            </button>

            {job && (
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl shadow-blue-900/10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-blue-100 text-sm font-medium mb-2">
                             <Briefcase size={16}/> {job.category} • {job.type}
                        </div>
                        <h1 className="text-3xl font-bold">{job.title}</h1>
                        <p className="text-blue-100 mt-1 opacity-90">{applicants.length} Total Applicants</p>
                    </div>
                </div>
            </div>
            )}
        </div>

        {/* APPLICANTS LIST */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">Candidate List</h3>
                 {/* Placeholder for future filter/sort */}
            </div>

            {applicants.length === 0 ? (
                 <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User2 className="w-8 h-8 text-gray-300"/>
                    </div>
                    <p className="text-gray-500 italic">No applicants found for this job yet.</p>
                 </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                                <th className="px-6 py-4">Candidate</th>
                                <th className="px-6 py-4">Applied Date</th>
                                <th className="px-6 py-4 text-center">Resume</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            <AnimatePresence>
                                {applicants.map((app, index) => (
                                    <motion.tr 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        key={app._id} 
                                        className="hover:bg-blue-50/50 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 flex items-center justify-center font-bold">
                                                    {app.applicant?.name?.charAt(0).toUpperCase() || "U"}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">{app.applicant?.name || "Unknown"}</div>
                                                    <div className="text-sm text-gray-500 flex items-center gap-1">
                                                        <Mail size={12}/> {app.applicant?.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                 <Calendar size={14} className="text-gray-400"/>
                                                 {new Date(app.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {app.resume ? (
                                                <a
                                                  href={app.resume}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-colors"
                                                >
                                                  <FileText size={14} /> Resume
                                                </a>
                                            ) : (
                                                <span className="text-gray-400 text-sm">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                to={`/application/${app._id}`}
                                                className="inline-flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:text-blue-600 hover:border-blue-200 hover:bg-white transition-all shadow-sm"
                                            >
                                                View Profile <ExternalLink size={14} />
                                            </Link>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
      </div>
    </DashboardLayout>
  );
}
