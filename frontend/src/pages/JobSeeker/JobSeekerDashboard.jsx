import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import JobCard from "./components/JobCard";
import axios from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import { SearchX, SlidersHorizontal, TrendingUp, Globe, Zap } from "lucide-react";

export default function JobSeekerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Mobile filter toggle
  
  // Analytics State
  const [stats, setStats] = useState({ total: 0, new: 0, remote: 0 });

  // Filters state
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    category: "",
    type: "",
    salaryMin: 0,
    salaryMax: 200000,
  });

  // Fetch Jobs
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await axios.get(`${API_PATHS.JOBS.GET_ALL_JOBS}?${query}`);
      // Handle both array response and { jobs: [] } response structure
      const jobsData = Array.isArray(res.data) ? res.data : (res.data.jobs || []);
      
      setJobs(jobsData);

      // Calculate Stats
      const total = jobsData.length;
      const newJobs = jobsData.filter(j => {
        const date = new Date(j.createdAt);
        const now = new Date();
        return (now - date) / (1000 * 60 * 60 * 24) < 2; // Posted within 2 days
      }).length;
      const remote = jobsData.filter(j => j.location?.toLowerCase().includes("remote") || j.type?.toLowerCase().includes("remote")).length;

      setStats({ total, new: newJobs, remote });

    } catch (err) {
      console.error(err);
      setJobs([]); 
    } finally {
      setTimeout(() => setLoading(false), 500); 
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchJobs();
    }, 400); // Debounce
    return () => clearTimeout(timeout);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50/50 pb-12">
        
        {/* ================= HERO & SEARCH SECTION ================= */}
        <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white pt-10 pb-24 px-4 sm:px-6 lg:px-8 rounded-b-[3rem] shadow-xl relative overflow-hidden">
          {/* Decorative Orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10 text-center mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">Dream Career</span>
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              Discover opportunities that align with your passion and potential.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative z-20">
             <SearchBar filters={filters} setFilters={setFilters} />
          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
          
          {/* --- ANALYTICS BAR --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 flex items-center gap-4 hover:-translate-y-1 transition-transform">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wide">Matches Found</p>
                <h3 className="text-2xl font-bold text-slate-900">{stats.total}</h3>
              </div>
            </div>
             <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 flex items-center gap-4 hover:-translate-y-1 transition-transform">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                <Zap size={24} />
              </div>
              <div>
                 <p className="text-slate-500 text-sm font-semibold uppercase tracking-wide">New (48h)</p>
                 <h3 className="text-2xl font-bold text-slate-900">{stats.new}</h3>
              </div>
            </div>
             <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 flex items-center gap-4 hover:-translate-y-1 transition-transform">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <Globe size={24} />
              </div>
              <div>
                 <p className="text-slate-500 text-sm font-semibold uppercase tracking-wide">Remote Jobs</p>
                 <h3 className="text-2xl font-bold text-slate-900">{stats.remote}</h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* --- SIDEBAR FILTERS --- */}
            <aside className={`w-full lg:w-72 flex-none ${isFilterOpen ? 'block' : 'hidden'} lg:block transition-all`}>
               <div className="sticky top-6">
                  <FilterBar 
                    filters={filters} 
                    handleChange={handleFilterChange} 
                    resetFilters={() => setFilters({ title: "", location: "", category: "", type: "", salaryMin: 0, salaryMax: 200000 })}
                  />
               </div>
            </aside>

            {/* --- JOB LISTINGS --- */}
            <main className="flex-1 min-w-0"> {/* min-w-0 prevents flex child from overflowing */}
              
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-6">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="w-full flex items-center justify-center gap-2 bg-white py-3 rounded-xl shadow-sm border border-indigo-100 font-bold text-indigo-900"
                >
                  <SlidersHorizontal size={18} /> {isFilterOpen ? "Hide Filters" : "Show Filters"}
                </button>
              </div>

              {/* LOADING STATE */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="h-64 bg-white rounded-2xl animate-pulse shadow-sm border border-slate-100"></div>
                  ))}
                </div>
              ) : jobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <SearchX size={40} className="text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">No jobs found</h3>
                   <p className="text-slate-500 max-w-xs mx-auto mt-2">
                    Try adjusting your search keywords or filters to find what you are looking for.
                  </p>
                  <button 
                    onClick={() => setFilters({ title: "", location: "", category: "", type: "", salaryMin: 0, salaryMax: 200000 })}
                    className="mt-6 px-6 py-2 bg-indigo-50 text-indigo-600 font-bold rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                   <div className="flex items-center justify-between text-slate-500 text-sm font-medium px-2">
                      <p>Showing <span className="font-bold text-slate-900">{jobs.length}</span> jobs</p>
                      <p>Sort by: <span className="text-slate-900 font-bold">Newest</span></p>
                   </div>
                   <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                      {jobs.map((job) => (
                        <JobCard key={job._id} job={job} />
                      ))}
                   </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
