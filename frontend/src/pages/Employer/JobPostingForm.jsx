import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

import InputField from "../../components/Input/InputField";
import SelectField from "../../components/Input/SelectField";
import TextareaField from "../../components/Input/TextareaField";
import JobPostingPreview from "../../components/Cards/JobPostingPreview";

import axios from "../../utils/axiosInstance";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";

const defaultForm = {
  title: "",
  location: "",
  category: "",
  type: "",
  description: "",
  requirements: "",
  salaryMin: "",
  salaryMax: "",
};

export default function JobPostingForm() {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ⭐ Detect Edit Mode
  const [searchParams] = useSearchParams();
  const editJobId = searchParams.get("id");
  const isEditMode = Boolean(editJobId);

  const navigate = useNavigate();

  const categories = ["Engineering", "Design", "Marketing", "HR", "Product", "Operations"];
  const jobTypes = ["Remote", "Full-Time", "Part-Time", "Internship", "Contract"];

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Job title is required";
    if (!form.location.trim()) e.location = "Location is required";
    if (!form.category) e.category = "Select a category";
    if (!form.type) e.type = "Select job type";
    if (!form.description.trim()) e.description = "Description required";
    if (!form.requirements.trim()) e.requirements = "Requirements required";
    return e;
  };

  const openPreview = () => {
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) setIsPreviewOpen(true);
  };

  // ⭐ Load existing job for editing
  const loadExistingJob = async () => {
    try {
      const res = await axios.get(`/api/jobs/${editJobId}`);
      const job = res.data;

      setForm({
        title: job.title,
        location: job.location,
        category: job.category,
        type: job.type,
        description: job.description,
        requirements: job.requirements,
        salaryMin: job.salaryMin || "",
        salaryMax: job.salaryMax || "",
      });
    } catch (err) {
      console.log("Error loading job:", err);
      alert("Failed to load job details.");
    }
  };

  useEffect(() => {
    if (isEditMode) loadExistingJob();
  }, [isEditMode]);

  // ⭐ Submit Logic: POST (create) or PUT (edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    try {
      setSubmitting(true);

      const payload = {
        title: form.title,
        location: form.location,
        category: form.category,
        type: form.type,
        description: form.description,
        requirements: form.requirements,
        salaryMin: Number(form.salaryMin),
        salaryMax: Number(form.salaryMax),
      };

      if (isEditMode) {
        // ⭐ EDIT JOB
        await axios.put(`/api/jobs/${editJobId}`, payload);
        alert("Job updated successfully!");
      } else {
        // ⭐ CREATE JOB
        await axios.post("/api/jobs", payload);
        alert("Job posted successfully!");
      }

      navigate("/manage-jobs");

    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Failed to submit job.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {isEditMode ? "Edit Job" : "Post a New Job"}
          </h2>

          <div className="flex gap-3">
            <button 
              onClick={openPreview}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Preview
            </button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={submitting}
              onClick={handleSubmit}
              className={`px-4 py-2 text-white rounded ${
                submitting ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {submitting 
                ? (isEditMode ? "Updating..." : "Publishing...") 
                : (isEditMode ? "Update Job" : "Publish Job")}
            </motion.button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border space-y-4">

          <InputField
            label="Job Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g., Senior UI/UX Designer"
            error={errors.title}
          />

          <InputField
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g., New York, NY"
            error={errors.location}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Category"
              name="category"
              options={categories}
              value={form.category}
              onChange={handleChange}
              error={errors.category}
            />

            <SelectField
              label="Job Type"
              name="type"
              options={jobTypes}
              value={form.type}
              onChange={handleChange}
              error={errors.type}
            />
          </div>

          <TextareaField
            label="Job Description"
            name="description"
            rows={6}
            value={form.description}
            onChange={handleChange}
            error={errors.description}
            placeholder="Describe the role…"
          />

          <TextareaField
            label="Requirements"
            name="requirements"
            rows={4}
            value={form.requirements}
            onChange={handleChange}
            error={errors.requirements}
            placeholder="List the qualifications…"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Salary Min"
              name="salaryMin"
              type="number"
              value={form.salaryMin}
              onChange={handleChange}
              error={errors.salaryMin}
              placeholder="e.g., 3000"
            />

            <InputField
              label="Salary Max"
              name="salaryMax"
              type="number"
              value={form.salaryMax}
              onChange={handleChange}
              error={errors.salaryMax}
              placeholder="e.g., 7000"
            />
          </div>

        </div>
      </div>

      <JobPostingPreview 
        open={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        job={form}
      />
    </DashboardLayout>
  );
}

