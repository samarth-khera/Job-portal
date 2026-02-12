import React, { useEffect, useState, useRef } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/Input/InputField";
import TextareaField from "../../components/Input/TextareaField";
import { Upload, Save, User, Building2, Image as ImageIcon, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function EditEmployerProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    companyName: "",
    companyWebsite: "",
    companyDescription: "",
    profilePic: "",
    companyLogo: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const profileInputRef = useRef(null);
  const logoInputRef = useRef(null);

  // ------------------------------
  // Load profile from backend
  // ------------------------------
  const loadProfile = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);

      setForm({
        name: res.data.name || "",
        email: res.data.email || "",
        companyName: res.data.companyName || "",
        companyWebsite: res.data.companyWebsite || "",
        companyDescription: res.data.companyDescription || "",
        profilePic: res.data.profilePic || "",
        companyLogo: res.data.companyLogo || "",
      });
    } catch (err) {
      console.error(err);
      // alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // ------------------------------
  // Handle text changes
  // ------------------------------
  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  // ------------------------------
  // Upload image to backend
  // ------------------------------
  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("image", file);

    try {
      const res = await axiosInstance.post(
        API_PATHS.IMAGE.UPLOAD_IMAGE,
        fd
      );

      setForm({ ...form, [field]: res.data.url });
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Image upload failed");
    }
  };

  // ------------------------------
  // Save profile to backend
  // ------------------------------
  const handleSubmit = async () => {
    setSaving(true);
    try {
      await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, form);

      // alert("Profile updated successfully!"); 
      navigate("/company-profile");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

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
      <div className="max-w-4xl mx-auto pb-12">
        <button
            className="flex items-center gap-2 text-gray-500 mb-6 hover:text-blue-600 transition-colors"
            onClick={() => navigate(-1)}
        >
            <ArrowLeft size={18} /> Cancel & Back
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
                <p className="text-gray-500">Update your personal details and company information.</p>
            </div>
            <button
                onClick={handleSubmit}
                disabled={saving}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
                <Save size={18} />
                {saving ? "Saving..." : "Save Changes"}
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: UPLOADS */}
            <div className="space-y-6">
                 {/* Profile Pic Card */}
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <User size={18} className="text-blue-500"/> Your Avatar
                    </h3>
                    <div className="w-24 h-24 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden mb-4 relative group">
                        {form.profilePic ? (
                            <img src={form.profilePic} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User size={32} className="text-gray-300" />
                        )}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => profileInputRef.current.click()}>
                            <Upload size={20} className="text-white"/>
                        </div>
                    </div>
                    <button 
                        onClick={() => profileInputRef.current.click()}
                        className="text-sm text-blue-600 font-medium hover:underline"
                    >
                        Change Photo
                    </button>
                    <input
                        ref={profileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "profilePic")}
                        className="hidden"
                    />
                 </div>

                 {/* Company Logo Card */}
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Building2 size={18} className="text-purple-500"/> Company Logo
                    </h3>
                    <div className="w-24 h-24 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden mb-4 relative group">
                        {form.companyLogo ? (
                            <img src={form.companyLogo} alt="Logo" className="w-full h-full object-cover" />
                        ) : (
                            <ImageIcon size={32} className="text-gray-300" />
                        )}
                         <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => logoInputRef.current.click()}>
                            <Upload size={20} className="text-white"/>
                        </div>
                    </div>
                    <button 
                        onClick={() => logoInputRef.current.click()}
                        className="text-sm text-blue-600 font-medium hover:underline"
                    >
                        Change Logo
                    </button>
                    <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "companyLogo")}
                        className="hidden"
                    />
                 </div>
            </div>

            {/* RIGHT COLUMN: FORM FIELDS */}
            <div className="md:col-span-2 space-y-6">
                
                {/* Personal Info */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-5 border-b pb-2">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            label="Full Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                        />
                         <InputField
                            label="Email Address"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="name@example.com"
                            type="email"
                        />
                    </div>
                </div>

                {/* Company Info */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-5 border-b pb-2">Company Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            label="Company Name"
                            name="companyName"
                            value={form.companyName}
                            onChange={handleChange}
                            placeholder="e.g. Acme Corp"
                        />
                         <InputField
                            label="Company Website"
                            name="companyWebsite"
                            value={form.companyWebsite}
                            onChange={handleChange}
                            placeholder="https://acme.com"
                        />
                    </div>
                    <div className="mt-2">
                        <TextareaField
                            label="Company Description"
                            name="companyDescription"
                            value={form.companyDescription}
                            onChange={handleChange}
                            placeholder="Tell us about your company mission and culture..."
                            rows={6}
                        />
                    </div>
                </div>

            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
