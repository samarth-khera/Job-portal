import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";

import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/JobCard";
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function JobSeekerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    category: "",
    type: "",
    salaryMin: 0,
    salaryMax: 500000,
  });

  const fetchJobs = async () => {
    try {
      const res = await axios.get(API_PATHS.JOBS.GET_ALL_JOBS);
      setJobs(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...jobs];

    if (filters.keyword) {
      result = result.filter((job) =>
        job.title.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }

    if (filters.location) {
      result = result.filter((job) =>
        job.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.category) {
      result = result.filter((job) => job.category === filters.category);
    }

    if (filters.type) {
      result = result.filter((job) => job.type === filters.type);
    }

    result = result.filter(
      (job) =>
        (job.salaryMin || 0) >= filters.salaryMin &&
        (job.salaryMax || 0) <= filters.salaryMax
    );

    setFiltered(result);
  }, [filters, jobs]);

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-gray-500 text-center mt-10">Loading jobs...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-4">
        <SearchBar filters={filters} setFilters={setFilters} />

        <div className="flex gap-6 mt-6">
          {/* Left Filter Bar */}
          <FilterBar filters={filters} setFilters={setFilters} />

          {/* Job Listing */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {filtered.length === 0 ? (
              <p className="text-gray-500 text-center w-full">
                No jobs found.
              </p>
            ) : (
              filtered.map((job) => <JobCard key={job._id} job={job} />)
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
