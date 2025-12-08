import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axios from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import { User, MapPin, FileText, Upload, Trash2 } from "lucide-react";

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
  // UPLOAD RESUME  ✔ FIXED
  // Backend does NOT have /upload-resume, so we use /api/users/resume
  // ----------------------------------------------------------
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("resume", file); // MUST match backend field name

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
  // DELETE RESUME  ✔ FIXED
  // Backend route = POST /api/users/resume
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
        <p className="text-center text-gray-500 mt-10">Loading profile…</p>
      </DashboardLayout>
    );
  }

  // ----------------------------------------------------------
  // MAIN UI
  // ----------------------------------------------------------
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded-xl">

        <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

        {/* Avatar */}
        <div className="flex items-center gap-6">
          <img
            src={
              user.avatar ||
              "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            }
            alt="Avatar"
            className="w-24 h-24 rounded-full border object-cover"
          />

          <div>
            <button
              onClick={() => avatarInputRef.current.click()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Upload size={18} /> Upload Avatar
            </button>

            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Name */}
        <div className="mt-6">
          <label className="font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* Email (readonly) */}
        <div className="mt-4">
          <label className="font-medium">Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full border p-2 rounded mt-1 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Location */}
        <div className="mt-4">
          <label className="font-medium flex items-center gap-2">
            <MapPin size={18} /> Location
          </label>
          <input
            type="text"
            name="location"
            value={user.location}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            placeholder="Delhi, India"
          />
        </div>

        {/* Skills */}
        <div className="mt-4">
          <label className="font-medium">Skills</label>
          <textarea
            name="skills"
            value={user.skills}
            onChange={handleChange}
            rows="3"
            className="w-full border p-2 rounded mt-1"
            placeholder="React, Node.js, Python"
          />
        </div>

        {/* Experience */}
        <div className="mt-4">
          <label className="font-medium">Experience</label>
          <textarea
            name="experience"
            value={user.experience}
            onChange={handleChange}
            rows="3"
            className="w-full border p-2 rounded mt-1"
            placeholder="2 years of frontend development"
          />
        </div>

        {/* Resume */}
        <div className="mt-6">
          <label className="font-medium flex items-center gap-2">
            <FileText size={18} /> Resume
          </label>

          {user.resume ? (
            <div className="mt-3 flex items-center justify-between p-3 border rounded-lg bg-gray-50">
              <a
                href={user.resume}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                View Resume
              </a>

              <button
                onClick={deleteResumeFile}
                className="p-2 rounded-full hover:bg-red-100"
              >
                <Trash2 size={18} className="text-red-600" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => resumeInputRef.current.click()}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Upload size={18} /> Upload Resume
            </button>
          )}

          <input
            ref={resumeInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            className="hidden"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={saveProfile}
          disabled={saving}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </DashboardLayout>
  );
}
