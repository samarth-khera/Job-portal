import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axios from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import { Edit, Trash2, XCircle, CheckCircle, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch employer’s posted jobs
  const fetchJobs = async () => {
    try {
      const res = await axios.get(API_PATHS.JOBS.GET_JOBS_EMPLOYER);
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      alert("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Delete job
  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await axios.delete(API_PATHS.JOBS.DELETE_JOB(id));

      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch {
      alert("Failed to delete job");
    }
  };

  // Toggle open/close
  const toggleJobStatus = async (id) => {
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
      <h2 className="text-2xl font-semibold mb-6">Manage Jobs</h2>

      <div className="bg-white rounded-xl border p-6 shadow-sm">
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-500 italic">You haven't posted any jobs yet.</p>
        ) : (
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="py-3">Job Title</th>
                <th>Status</th>
                <th>Applicants</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} className="border-b hover:bg-gray-50">
                  
                  {/* JOB TITLE */}
                  <td className="py-3">
                    <div className="font-semibold">{job.title}</div>
                    <div className="text-sm text-gray-500">
                      {job.category} • {job.type}
                    </div>
                  </td>

                  {/* STATUS */}
                  <td>
                    {job.isClosed ? (
                      <span className="text-red-600 flex items-center gap-1">
                        <XCircle size={16} /> Closed
                      </span>
                    ) : (
                      <span className="text-green-600 flex items-center gap-1">
                        <CheckCircle size={16} /> Active
                      </span>
                    )}
                  </td>

                  {/* APPLICANTS BUTTON */}
                  <td>
                    <button
                      onClick={() =>
                        navigate(`/applicants?jobId=${job._id}`)
                      }
                      className="flex items-center text-blue-600 gap-1 hover:underline"
                    >
                      <Users size={16} /> {job.applicantsCount || 0}
                    </button>
                  </td>

                  {/* ACTION BUTTONS */}
                  <td className="flex gap-4 py-3">

                    {/* EDIT */}
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => navigate(`/post-job?id=${job._id}`)}
                    >
                      <Edit size={18} />
                    </button>

                    {/* OPEN / CLOSE */}
                    <button
                      className="text-orange-600 hover:text-orange-800"
                      onClick={() => toggleJobStatus(job._id)}
                    >
                      {job.isClosed ? "Open" : "Close"}
                    </button>

                    {/* DELETE */}
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => deleteJob(job._id)}
                    >
                      <Trash2 size={18} />
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        )}
      </div>
    </DashboardLayout>
  );
}
