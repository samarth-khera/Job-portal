import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axios from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import { User, MapPin, FileText, Upload, Trash2, Mail, Briefcase, Code, Save } from "lucide-react";

export default function UserProfile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
    location: "",
    skills: "",
    experience: "",
    resume: "",
  });

  const avatarInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  // ----------------------------------------------------------
  // LOAD USER PROFILE
  // ----------------------------------------------------------
  const fetchProfile = async () => {
    try {
      const res = await axios.get(API_PATHS.AUTH.GET_PROFILE);
      setUser(res.data);
    } catch (err) {
      console.error("Profile load error:", err);
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ----------------------------------------------------------
  // HANDLE TEXT CHANGES
  // ----------------------------------------------------------
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // ----------------------------------------------------------
  // UPLOAD AVATAR
  // ----------------------------------------------------------
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("image", file);

    try {
      const res = await axios.post(API_PATHS.IMAGE.UPLOAD_IMAGE, fd);
      setUser({ ...user, avatar: res.data.url });
    } catch (err) {
      console.error("Avatar upload error:", err);
      alert("Failed to upload avatar");
    }
  };

  // ----------------------------------------------------------
  // UPLOAD RESUME
  // ----------------------------------------------------------
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("resume", file);

    try {
      const res = await axios.post(API_PATHS.AUTH.DELETE_RESUME, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser({ ...user, resume: res.data.resume });
    } catch (err) {
      console.error("Resume upload error:", err);
      alert("Failed to upload resume");
    }
  };

  // ----------------------------------------------------------
  // DELETE RESUME
  // ----------------------------------------------------------
  const deleteResumeFile = async () => {
    try {
      await axios.post(API_PATHS.AUTH.DELETE_RESUME);
      setUser({ ...user, resume: "" });
    } catch (err) {
      console.error("Resume delete error:", err);
      alert("Failed to delete resume");
    }
  };

  // ----------------------------------------------------------
  // SAVE PROFILE
  // ----------------------------------------------------------
  const saveProfile = async () => {
    setSaving(true);
    try {
      await axios.put(API_PATHS.AUTH.UPDATE_PROFILE, user);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // ----------------------------------------------------------
  // LOADING UI
  // ----------------------------------------------------------
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-[80vh] items-center justify-center">
           <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
        </div>
      </DashboardLayout>
    );
  }

  // ----------------------------------------------------------
  // MAIN UI
  // ----------------------------------------------------------
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto pb-12">
        
        {/* ================= HERO BANNER ================= */}
        <div className="relative mb-20">
           <div className="h-48 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-b-[2.5rem] shadow-lg"></div>
           
           <div className="absolute -bottom-16 left-8 md:left-12 flex items-end gap-6">
              <div className="relative group">
                <img
                  src={user.avatar || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}
                  alt="Avatar"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover bg-white"
                />
                <button
                  onClick={() => avatarInputRef.current.click()}
                  className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 transition-all border-2 border-white"
                  title="Upload Avatar"
                >
                  <Upload size={18} />
                </button>
              </div>
              
              <div className="mb-4">
                 <h1 className="text-3xl font-bold text-white drop-shadow-md">{user.name || "Your Name"}</h1>
                 <p className="text-blue-100 font-medium opacity-90">{user.location || "Location not set"}</p>
              </div>
           </div>
           
           <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
        </div>

        <div className="px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* ================= LEFT COLUMN ================= */}
            <div className="space-y-8">
               
               {/* 1. PERSONAL INFO CARD (BLUE THEME) */}
               <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden group hover:shadow-md transition-all">
                  <div className="bg-blue-50/50 px-6 py-4 border-b border-blue-100 flex items-center gap-3">
                     <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><User size={20} /></div>
                     <h2 className="font-bold text-lg text-slate-800">Personal Details</h2>
                  </div>
                  
                  <div className="p-6 space-y-5">
                     <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Full Name</label>
                        <input
                           type="text"
                           name="name"
                           value={user.name}
                           onChange={handleChange}
                           className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:bg-white outline-none transition-all"
                           placeholder="John Doe"
                        />
                     </div>

                     <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Email Address</label>
                        <div className="relative">
                           <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                           <input
                              type="email"
                              value={user.email}
                              readOnly
                              className="w-full pl-11 bg-slate-100 border border-slate-200 text-slate-500 font-medium px-4 py-3 rounded-xl cursor-not-allowed"
                           />
                        </div>
                     </div>

                     <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Location</label>
                        <div className="relative">
                           <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                           <input
                              type="text"
                              name="location"
                              value={user.location}
                              onChange={handleChange}
                              className="w-full pl-11 bg-slate-50 border border-slate-200 text-slate-900 font-medium px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:bg-white outline-none transition-all"
                              placeholder="City, Country"
                           />
                        </div>
                     </div>
                  </div>
               </div>

               {/* 3. RESUME CARD (GREEN/TEAL THEME) */}
               <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden group hover:shadow-md transition-all">
                  <div className="bg-emerald-50/50 px-6 py-4 border-b border-emerald-100 flex items-center gap-3">
                     <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><FileText size={20} /></div>
                     <h2 className="font-bold text-lg text-slate-800">Resume & Documents</h2>
                  </div>

                  <div className="p-6">
                     <p className="text-sm text-slate-500 mb-4">Upload your latest CV to let employers know about your qualifications.</p>
                     
                     {user.resume ? (
                        <div className="flex items-center justify-between p-4 border border-emerald-200 bg-emerald-50/30 rounded-xl">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-red-500">
                                 <FileText size={24} />
                              </div>
                              <div>
                                 <p className="font-bold text-slate-800 text-sm">Resume.pdf</p>
                                 <a
                                    href={user.resume}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs text-blue-600 hover:underline font-medium"
                                 >
                                    View File
                                 </a>
                              </div>
                           </div>
                           <button
                              onClick={deleteResumeFile}
                              className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                              title="Delete Resume"
                           >
                              <Trash2 size={20} />
                           </button>
                        </div>
                     ) : (
                        <div 
                           onClick={() => resumeInputRef.current.click()}
                           className="border-2 border-dashed border-emerald-200 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50 hover:border-emerald-300 transition-all group/upload"
                        >
                           <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3 group-hover/upload:scale-110 transition-transform">
                              <Upload size={24} />
                           </div>
                           <p className="font-bold text-slate-700">Click to Upload Resume</p>
                           <p className="text-xs text-slate-400 mt-1">PDF, DOCX formats supported</p>
                        </div>
                     )}

                     <input
                        ref={resumeInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="hidden"
                     />
                  </div>
               </div>

            </div>

            {/* ================= RIGHT COLUMN ================= */}
            <div className="space-y-8">
               
               {/* 2. PROFESSIONAL INFO CARD (PURPLE THEME) */}
               <div className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-hidden group hover:shadow-md transition-all h-full">
                  <div className="bg-purple-50/50 px-6 py-4 border-b border-purple-100 flex items-center gap-3">
                     <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Briefcase size={20} /></div>
                     <h2 className="font-bold text-lg text-slate-800">Professional Info</h2>
                  </div>
                  
                  <div className="p-6 space-y-6">
                     <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                           <Code size={14} /> Skills
                        </label>
                        <textarea
                           name="skills"
                           value={user.skills}
                           onChange={handleChange}
                           rows="4"
                           className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-200 focus:border-purple-400 focus:bg-white outline-none transition-all resize-none"
                           placeholder="E.g. React, Node.js, UI/UX Design..."
                        />
                        <p className="text-xs text-slate-400 mt-1 text-right">Separate with commas</p>
                     </div>

                     <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                           <Briefcase size={14} /> Experience
                        </label>
                        <textarea
                           name="experience"
                           value={user.experience}
                           onChange={handleChange}
                           rows="6"
                           className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-200 focus:border-purple-400 focus:bg-white outline-none transition-all resize-none"
                           placeholder="Summarize your work experience..."
                        />
                     </div>
                  </div>
               </div>

            </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="mt-8 px-4 md:px-8">
           <button
             onClick={saveProfile}
             disabled={saving}
             className="w-full md:w-auto md:min-w-[200px] float-right bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
           >
             <Save size={20} />
             {saving ? "Saving Changes..." : "Save Profile"}
           </button>
        </div>

      </div>
    </DashboardLayout>
  );
}
