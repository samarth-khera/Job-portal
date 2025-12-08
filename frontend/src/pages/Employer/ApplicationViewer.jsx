import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axios from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";

import { FileText, ArrowLeft, User2, Mail, Calendar, Briefcase } from "lucide-react";

export default function ApplicantsViewer() {
  const [searchParams] = useSearchParams();
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
      alert("Failed to load applicants.");
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
        <p className="text-gray-500">Loading applicants...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">

        <button
          className="flex items-center gap-2 text-blue-600 mb-4 hover:underline"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={18} /> Back
        </button>

        {job && (
          <div className="bg-white p-5 border rounded-xl shadow mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Briefcase size={20} /> {job.title}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {job.category} • {job.type}
            </p>
          </div>
        )}

        <h3 className="text-lg font-semibold mb-4">Applicants</h3>

        {applicants.length === 0 ? (
          <p className="text-gray-500 italic">No applicants yet.</p>
        ) : (
          <div className="space-y-4">
            {applicants.map((app) => (
              <div
                key={app._id}
                className="bg-white border rounded-xl p-5 shadow space-y-3"
              >
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <User2 size={20} />
                  {app.applicant?.name}
                </div>

                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <Mail size={16} />
                  {app.applicant?.email}
                </div>

                <div className="flex gap-4 mt-2">
                  {app.resume && (
                    <a
                      href={app.resume}
                      target="_blank"
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      <FileText size={18} /> View Resume
                    </a>
                  )}

                  {/* FIXED LINK */}
                  <Link
                    to={`/application/${app._id}`}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                  >
                    View Profile
                  </Link>
                </div>

                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Calendar size={16} />
                  Applied on: {new Date(app.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
