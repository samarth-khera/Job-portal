import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import InputField from "../../components/Input/InputField";
import SelectField from "../../components/Input/SelectField";
import TextareaField from "../../components/Input/TextareaField";
import axios from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPaths";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const categories = ["Engineering", "Design", "Marketing", "HR", "Product", "Operations"];
  const jobTypes = ["Remote", "Full-Time", "Part-Time", "Internship", "Contract"];

  const [form, setForm] = useState({
    title: "",
    location: "",
    category: "",
    type: "",
    description: "",
    requirements: "",
    salaryMin: "",
    salaryMax: ""
  });

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // -----------------------------
  // Load existing job details
  // -----------------------------
  const loadJob = async () => {
    try {
      const res = await axios.get(API_PATHS.JOBS.GET_JOB_BY_ID(id));
      const job = res.data;

      setForm({
        title: job.title,
        location: job.location || "",
        category: job.category,
        type: job.type,
        description: job.description,
        requirements: job.requirements,
        salaryMin: job.salaryMin || "",
        salaryMax: job.salaryMax || ""
      });
    } catch (err) {
      toast.error("Failed to load job");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJob();
  }, []);

  // -----------------------------
  // Submit Update
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.put(API_PATHS.JOBS.UPDATE_JOB(id), {
        ...form,
        salaryMin: Number(form.salaryMin),
        salaryMax: Number(form.salaryMax)
      });

      toast.success("Job updated successfully!");
      navigate("/manage-jobs");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <DashboardLayout>Loading job...</DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Job</h2>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border space-y-4">

          <InputField
            label="Job Title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />

          <InputField
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Category"
              name="category"
              options={categories}
              value={form.category}
              onChange={handleChange}
            />

            <SelectField
              label="Job Type"
              name="type"
              options={jobTypes}
              value={form.type}
              onChange={handleChange}
            />
          </div>

          <TextareaField
            label="Job Description"
            name="description"
            rows={5}
            value={form.description}
            onChange={handleChange}
          />

          <TextareaField
            label="Requirements"
            name="requirements"
            rows={4}
            value={form.requirements}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Salary Min"
              name="salaryMin"
              type="number"
              value={form.salaryMin}
              onChange={handleChange}
            />

            <InputField
              label="Salary Max"
              name="salaryMax"
              type="number"
              value={form.salaryMax}
              onChange={handleChange}
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={saving}
            type="submit"
            className={`px-4 py-2 rounded-md text-white w-full ${
              saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {saving ? "Saving..." : "Save Changes"}
          </motion.button>
        </form>
      </div>
    </DashboardLayout>
  );
}
