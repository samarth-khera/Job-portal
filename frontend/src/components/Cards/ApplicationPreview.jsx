import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axios from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import { ArrowLeft, FileText, Mail } from "lucide-react";

export default function ApplicationPreview() {
  const { id: applicationId } = useParams(); // FIXED

  const [application, setApplication] = useState(null);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);

  const statuses = ["Pending", "In Review", "Accepted", "Rejected"];

  const fetchApplication = async () => {
    try {
      const res = await axios.get(
        API_PATHS.APPLICATIONS.GET_SINGLE_APPLICATION(applicationId)
      );

      setApplication(res.data);
      setJob(res.data.job);
    } catch (err) {
      console.error(err);
      alert("Failed to load application data");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    setStatusLoading(true);
    try {
      await axios.put(API_PATHS.APPLICATIONS.UPDATE_STATUS(applicationId), {
        status: newStatus,
      });

      setApplication((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setStatusLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, [applicationId]);

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-gray-500">Loading application...</p>
      </DashboardLayout>
    );
  }

  if (!application) {
    return (
      <DashboardLayout>
        <p className="text-red-500">Application not found</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto">
        <button
          className="flex items-center gap-2 text-blue-600 mb-6 hover:underline"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={18} /> Back
        </button>

        <div className="bg-white border shadow rounded-2xl p-6">
          <div className="flex flex-col items-center text-center">
            <img
              src={application.applicant?.profilePic || "/default-user.png"}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover"
            />

            <h2 className="text-xl font-semibold mt-3">
              {application.applicant?.name}
            </h2>

            <div className="flex items-center gap-2 text-gray-600 mt-1">
              <Mail size={16} /> {application.applicant?.email}
            </div>
          </div>

          <div className="mt-6 text-sm">
            <p className="font-semibold text-gray-700">Applied Position</p>
            <p className="text-gray-900">{job?.title}</p>
            <p className="text-gray-500">{job?.category} • {job?.type}</p>
          </div>

          <div className="mt-6 text-sm border-t pt-4">
            <p className="font-semibold text-gray-700">Application Details</p>

            <p className="text-gray-900 mt-1">
              Status:{" "}
              <span className="font-medium text-blue-600">
                {application.status}
              </span>
            </p>

            <p className="text-gray-900">
              Applied Date:{" "}
              {new Date(application.createdAt).toLocaleDateString()}
            </p>
          </div>

          {application.resume && (
            <a
              href={application.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full bg-blue-600 text-white flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-blue-700"
            >
              <FileText size={18} /> Download Resume
            </a>
          )}

          <div className="mt-6">
            <label className="font-semibold text-gray-700">
              Change Application Status
            </label>

            <select
              className="w-full border rounded-lg mt-2 px-3 py-2"
              value={application.status}
              onChange={(e) => updateStatus(e.target.value)}
              disabled={statusLoading}
            >
              {statuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>

            {statusLoading && (
              <p className="text-sm text-gray-500 mt-2">
                Updating status...
              </p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
