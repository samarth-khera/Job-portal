import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axios from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import { Link } from "react-router-dom";

export default function EmployerProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(API_PATHS.AUTH.GET_PROFILE);
      setProfile(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load profile");
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
        <p className="text-gray-500">Loading profile...</p>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <p className="text-red-500">Profile not found</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header Row */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Employer Profile</h1>

          <Link
            to="/employer/edit-profile"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit Profile
          </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-white shadow border rounded-xl p-6">
          {/* Profile Picture + Basic Info */}
          <div className="flex items-center gap-4">
            <img
              src={profile.profilePic || "/default-user.png"}
              alt="profile"
              className="w-20 h-20 object-cover rounded-full"
            />

            <div>
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-medium text-gray-800">
              Personal Information
            </h3>

            <p className="mt-2 text-gray-700">
              <strong>Name:</strong> {profile.name}
            </p>

            <p className="text-gray-700">
              <strong>Email:</strong> {profile.email}
            </p>
          </div>

          {/* Company Information */}
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-medium text-gray-800">
              Company Information
            </h3>

            <div className="flex items-center gap-4 mt-2">
              <img
                src={profile.companyLogo || "/default-company.png"}
                alt="company-logo"
                className="w-16 h-16 object-cover rounded-lg border"
              />

              <div>
                <p className="text-gray-700">
                  <strong>Company Name:</strong> {profile.companyName}
                </p>

                <p className="text-gray-700">
                  <strong>Location:</strong> {profile.companyLocation || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* About Company */}
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-medium text-gray-800">
              About Company
            </h3>

            <p className="text-gray-700 mt-2">
              {profile.companyDescription || "No description provided."}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
