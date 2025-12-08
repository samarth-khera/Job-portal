import React, { useEffect, useState, useRef } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";

export default function EditEmployerProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    companyName: "",
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
        companyDescription: res.data.companyDescription || "",
        profilePic: res.data.profilePic || "",
        companyLogo: res.data.companyLogo || "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load profile");
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
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

      alert("Profile updated successfully!");
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
        <p className="text-gray-500">Loading profile...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-4">Edit Employer Profile</h2>

        {/* Full Name */}
        <label className="block mt-4 font-medium">Full Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Email */}
        <label className="block mt-4 font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Company Name */}
        <label className="block mt-4 font-medium">Company Name</label>
        <input
          type="text"
          name="companyName"
          value={form.companyName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Company Description */}
        <label className="block mt-4 font-medium">Company Description</label>
        <textarea
          name="companyDescription"
          value={form.companyDescription}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows="4"
        />

        {/* Profile Picture */}
        <div className="mt-6">
          <label className="block font-medium mb-1">Profile Picture</label>

          <button
            type="button"
            onClick={() => profileInputRef.current.click()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Upload Image
          </button>

          <input
            ref={profileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "profilePic")}
            className="hidden"
          />

          {form.profilePic && (
            <img
              src={form.profilePic}
              alt="profile"
              className="w-20 h-20 rounded-full mt-3 border"
            />
          )}
        </div>

        {/* Company Logo */}
        <div className="mt-6">
          <label className="block font-medium mb-1">Company Logo</label>

          <button
            type="button"
            onClick={() => logoInputRef.current.click()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Upload Logo
          </button>

          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "companyLogo")}
            className="hidden"
          />

          {form.companyLogo && (
            <img
              src={form.companyLogo}
              alt="company logo"
              className="w-20 h-20 mt-3 rounded-lg border"
            />
          )}
        </div>

        {/* Save */}
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </DashboardLayout>
  );
}
