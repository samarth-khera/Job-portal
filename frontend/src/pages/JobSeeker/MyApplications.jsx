import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axios from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import { FileText, Calendar, Building2, CheckCircle2, XCircle, Clock, Search } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

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
      setTimeout(() => setLoading(false), 300);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Badge UI based on status
  const getStatusBadge = (status) => {
    if (!status) return null;

    const baseClasses = "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5";

    switch (status.toLowerCase()) {
      case "accepted":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-700 border border-green-200`}>
            <CheckCircle2 size={14} /> Accepted
          </span>
        );
      case "rejected":
        return (
          <span className={`${baseClasses} bg-red-100 text-red-700 border border-red-200`}>
            <XCircle size={14} /> Rejected
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-blue-100 text-blue-700 border border-blue-200`}>
            <Clock size={14} /> Pending
          </span>
        );
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-[80vh] items-center justify-center">
           <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent animate-spin rounded-full"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:pb-12">
        
        {/* HEADER */}
        <div className="relative mb-8 rounded-3xl overflow-hidden shadow-lg bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 p-8 text-white">
           <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-10 -translate-y-10">
              <FileText size={200} />
           </div>
           
           <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2">My Applications</h1>
              <p className="text-emerald-50 text-lg opacity-90 max-w-xl">
                 Track the status of your job applications. Good luck!
              </p>
           </div>
        </div>

        {/* CONTENT */}
        {applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-slate-300 text-center">
             <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                <Search size={40} className="text-emerald-300" />
             </div>
             <h3 className="text-2xl font-bold text-slate-800 mb-2">No applications yet</h3>
             <p className="text-slate-500 max-w-md mx-auto mb-8">
               You haven't applied to any jobs yet. Start exploring opportunities to launch your career.
             </p>
             <Link 
               to="/find-jobs"
               className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-95"
             >
               Find Jobs
             </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                   <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                      <Building2 className="text-slate-400" size={28} />
                   </div>
                   
                   <div>
                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {app.job?.title || "Unknown Job"}
                      </h2>
                      <p className="text-slate-500 font-medium mb-2">{app.job?.company?.companyName || "Unknown Company"}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400">
                         <span className="flex items-center gap-1"><Calendar size={14} /> Applied on {new Date(app.createdAt).toLocaleDateString()}</span>
                         <span className="text-slate-300">|</span>
                         <span className="flex items-center gap-1">ID: {app._id.slice(-6)}</span>
                      </div>
                   </div>
                </div>

                {/* STATUS & ACTIONS */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pl-20 md:pl-0 border-l-2 border-slate-100 md:border-l-0">
                  <div className="min-w-[120px]">
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 md:hidden">Status</span>
                     {getStatusBadge(app.status)}
                  </div>

                  <button
                    onClick={() => navigate(`/application/${app._id}`)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 font-bold rounded-xl border border-slate-200 hover:border-emerald-200 transition-all"
                  >
                    View Details
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
