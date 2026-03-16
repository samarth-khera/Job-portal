import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axios from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import { Link } from "react-router-dom";
import { MapPin, Globe, Mail, Building2, Edit2, Phone, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function EmployerProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(API_PATHS.AUTH.GET_PROFILE);
      setProfile(res.data);
    } catch (err) {
      console.error(err);
      // alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
         <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 text-red-500">
            Profile not found. Please try refreshing.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto pb-12">
        
        {/* === HERO SECTION === */}
        <div className="relative mb-32 md:mb-16">
            {/* Banner */}
            <div className="h-48 md:h-64 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-b-3xl -mx-4 sm:-mx-6 -mt-6 md:mx-0 md:mt-0 md:rounded-3xl shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            </div>

            {/* Profile Header Cards */}
            <div className="absolute -bottom-24 md:-bottom-12 left-4 right-4 sm:left-6 sm:right-6 flex flex-col md:flex-row items-center md:items-end justify-between gap-4">
                
                {/* Logo & Name */}
                <div className="flex flex-col md:flex-row items-center md:items-end gap-3 md:gap-6 text-center md:text-left">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white p-1 rounded-2xl shadow-xl shadow-black/10"
                    >
                        <img 
                            src={profile.companyLogo || "https://ui-avatars.com/api/?name=Company&background=random"} 
                            alt="Company Logo" 
                            className="w-full h-full object-cover rounded-xl bg-gray-50"
                        />
                    </motion.div>
                    <div className="mb-1 md:mb-3">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 md:text-white drop-shadow-md">{profile.companyName || profile.name}</h1>
                        <p className="text-gray-600 md:text-blue-100 flex items-center justify-center md:justify-start gap-1.5 text-xs sm:text-sm font-medium mt-1">
                            <MapPin size={16}/> {profile.companyLocation || "Location not set"}
                        </p>
                    </div>
                </div>

                {/* Edit Button */}
                <Link 
                    to="/employer/edit-profile" 
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-gray-700 font-medium rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 hover:text-blue-600 transition-all mb-1 md:mb-3 w-full md:w-auto"
                >
                    <Edit2 size={16} /> Edit Profile
                </Link>
            </div>
        </div>

        {/* === CONTENT GRID === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8">
            
            {/* LEFT: MAIN INFO */}
            <div className="md:col-span-2 space-y-6 sm:space-y-8">
                {/* About Section */}
                <section className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                        About the Company
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line">
                        {profile.companyDescription || "No description provided yet. Add a description to tell candidates about your mission and culture."}
                    </p>
                </section>

                {/* Stat Cards (Mockup) */}
                <section className="grid grid-cols-2 gap-3 sm:gap-4">
                   <div className="bg-blue-50 p-4 sm:p-5 rounded-2xl border border-blue-100">
                      <div className="text-blue-600 mb-1 sm:mb-2"><Building2 size={24} className="w-5 h-5 sm:w-6 sm:h-6"/></div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-900">12</div>
                      <div className="text-xs sm:text-sm text-gray-500">Active Jobs</div>
                   </div>
                   <div className="bg-purple-50 p-4 sm:p-5 rounded-2xl border border-purple-100">
                      <div className="text-purple-600 mb-1 sm:mb-2"><Calendar size={24} className="w-5 h-5 sm:w-6 sm:h-6"/></div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-900">2024</div>
                      <div className="text-xs sm:text-sm text-gray-500">Member Since</div>
                   </div>
                </section>
            </div>

            {/* RIGHT: SIDEBAR */}
            <div className="space-y-6">
                
                {/* Contact Details */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Contact Info</h3>
                    
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-sm">
                            <div className="p-2 bg-gray-50 rounded-lg text-gray-500"><Mail size={16}/></div>
                            <div>
                                <p className="text-xs text-gray-400 font-medium">Email Address</p>
                                <p className="text-gray-700 font-medium truncate max-w-[180px]">{profile.email}</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 text-sm">
                             <div className="p-2 bg-gray-50 rounded-lg text-gray-500"><Phone size={16}/></div>
                            <div>
                                <p className="text-xs text-gray-400 font-medium">Phone</p>
                                <p className="text-gray-700 font-medium">{profile.contact || "Not provided"}</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 text-sm">
                             <div className="p-2 bg-gray-50 rounded-lg text-gray-500"><Globe size={16}/></div>
                            <div>
                                <p className="text-xs text-gray-400 font-medium">Website</p>
                                {profile.companyWebsite ? (
                                    <a 
                                        href={profile.companyWebsite.startsWith('http') ? profile.companyWebsite : `https://${profile.companyWebsite}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-600 font-medium hover:underline truncate max-w-[200px] block"
                                    >
                                        Visit Website
                                    </a>
                                ) : (
                                    <span className="text-gray-400 text-sm">Not provided</span>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Primary Contact Person */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl text-white shadow-lg">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Account Manager</h3>
                    <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                            {profile.name?.charAt(0) || "U"}
                         </div>
                         <div>
                            <p className="font-bold text-lg">{profile.name}</p>
                            <p className="text-gray-400 text-sm">Recruiter / Admin</p>
                         </div>
                    </div>
                </div>

            </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
