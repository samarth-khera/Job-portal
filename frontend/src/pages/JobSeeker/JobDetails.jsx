import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Bookmark, BookmarkCheck, MapPin, Briefcase, DollarSign } from "lucide-react";

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
        <p className="text-gray-500 text-center mt-10">Loading job details...</p>
      </DashboardLayout>
    );
  }

  if (!job) {
    return (
      <DashboardLayout>
        <p className="text-red-500 text-center mt-10">Job not found.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto bg-white shadow p-6 rounded-xl mt-5">
        
        {/* Company Header */}
        <div className="flex items-center gap-4">
          <img
            src={job.company?.companyLogo || "/default-company.png"}
            alt="company logo"
            className="w-16 h-16 rounded-lg border object-cover"
          />

          <div>
            <h1 className="text-2xl font-semibold">{job.title}</h1>
            <p className="text-gray-600">{job.company?.companyName}</p>
          </div>
        </div>

        {/* Job Highlights */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
          <p className="flex items-center gap-2">
            <MapPin size={18} /> {job.location || "Not specified"}
          </p>

          <p className="flex items-center gap-2">
            <Briefcase size={18} /> {job.type}
          </p>

          <p className="flex items-center gap-2">
            <DollarSign size={18} /> 
            {job.salaryMin && job.salaryMax
              ? `${job.salaryMin} - ${job.salaryMax}`
              : "Not mentioned"}
          </p>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Job Description</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {job.description}
          </p>
        </div>

        {/* Requirements */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Requirements</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {job.requirements}
          </p>
        </div>

        {/* Apply + Save Buttons */}
        <div className="mt-8 flex gap-4">

          {/* APPLY BUTTON */}
          <button
            onClick={handleApply}
            disabled={isApplied}
            className={`px-6 py-3 rounded-lg text-lg text-white 
              ${isApplied ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {isApplied ? "Applied" : "Apply Now"}
          </button>

          {/* SAVE JOB BUTTON */}
          <button
            onClick={handleSave}
            className="px-6 py-3 border rounded-lg flex items-center gap-2 hover:bg-gray-100"
          >
            {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
            {isSaved ? "Saved" : "Save Job"}
          </button>

        </div>
      </div>
    </DashboardLayout>
  );
}
