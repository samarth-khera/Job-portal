import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

import InputField from "../../components/Input/InputField";
import SelectField from "../../components/Input/SelectField";
import TextareaField from "../../components/Input/TextareaField";
import JobPostingPreview from "../../components/Cards/JobPostingPreview";

import axios from "../../utils/axiosInstance";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, LayoutTemplate } from "lucide-react";

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
      <div className="max-w-5xl mx-auto pb-12">

        {/* Header / Nav */}
        <div className="flex items-center gap-4 mb-8">
            <button 
                onClick={() => navigate(-1)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            >
                <ArrowLeft className="w-5 h-5 text-gray-600"/>
            </button>
            <div>
                <h1 className="text-2xl font-bold text-gray-800">{isEditMode ? "Edit Job Posting" : "Create New Job Post"}</h1>
                <p className="text-gray-500 text-sm">Fill in the details to find your next great hire.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Main Form Area */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
               <div className="p-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
               <div className="p-8 space-y-8">
                  
                  {/* Section 1: Basic Info */}
                  <section>
                      <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">01</span>
                        Job Details
                      </h3>
                      <div className="space-y-1">
                        <InputField label="Job Title" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Senior Frontend Developer" error={errors.title} />
                        <InputField label="Location" name="location" value={form.location} onChange={handleChange} placeholder="e.g. Remote, New York, NY" error={errors.location} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <SelectField label="Category" name="category" options={categories} value={form.category} onChange={handleChange} error={errors.category} />
                            <SelectField label="Job Type" name="type" options={jobTypes} value={form.type} onChange={handleChange} error={errors.type} />
                        </div>
                      </div>
                  </section>
                  
                  <hr className="border-gray-100" />

                  {/* Section 2: Description */}
                  <section>
                      <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold">02</span>
                        Description & Requirements
                      </h3>
                      <div className="space-y-1">
                          <TextareaField label="Job Description" name="description" rows={6} value={form.description} onChange={handleChange} error={errors.description} placeholder="Describe the role, responsibilities, and team culture..." />
                          <TextareaField label="Requirements" name="requirements" rows={4} value={form.requirements} onChange={handleChange} error={errors.requirements} placeholder="List key qualifications, skills, and experience needed..." />
                      </div>
                  </section>

                  <hr className="border-gray-100" />

                  {/* Section 3: Salary */}
                  <section>
                      <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-sm font-bold">03</span>
                        Salary Range
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputField label="Minimum Salary" name="salaryMin" type="number" value={form.salaryMin} onChange={handleChange} error={errors.salaryMin} placeholder="e.g. 50000" />
                        <InputField label="Maximum Salary" name="salaryMax" type="number" value={form.salaryMax} onChange={handleChange} error={errors.salaryMax} placeholder="e.g. 80000" />
                      </div>
                  </section>
               </div>
               
               {/* Footer Actions */}
               <div className="px-5 sm:px-8 py-5 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                   <button 
                     onClick={() => navigate(-1)}
                     className="w-full sm:w-auto px-5 py-2.5 text-gray-600 font-medium hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors order-2 sm:order-1"
                   >
                     Cancel
                   </button>
                   <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto order-1 sm:order-2">
                       <button 
                         onClick={openPreview} 
                         className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium bg-white hover:bg-gray-50 transition-all flex justify-center items-center gap-2"
                       >
                         <LayoutTemplate className="w-4 h-4"/> Preview
                       </button>
                       <button 
                         onClick={handleSubmit} 
                         disabled={submitting}
                         className={`w-full sm:w-auto px-8 py-2.5 rounded-xl font-bold text-white shadow-lg shadow-blue-500/30 transition-all flex justify-center items-center gap-2
                           ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] active:scale-[0.98]'}
                         `}
                       >
                         {submitting ? 'Processing...' : (
                           <>
                             {isEditMode ? 'Update Job' : 'Publish Job'} <CheckCircle className="w-4 h-4"/>
                           </>
                         )}
                       </button>
                   </div>
               </div>

            </motion.div>

            {/* Sticky Sidebar Help/Tips */}
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="hidden lg:block lg:col-span-1 space-y-6 sticky top-8"
            >
               <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                  <h4 className="font-bold text-blue-900 text-lg mb-3">Writing a Great Job Post</h4>
                  <ul className="space-y-3 text-sm text-blue-800/80">
                     <li className="flex gap-2">
                        <span className="font-bold">•</span>
                        <span>Use a clear, standard job title.</span>
                     </li>
                     <li className="flex gap-2">
                        <span className="font-bold">•</span>
                        <span>Be specific about requirements (years of experience, specific tools).</span>
                     </li>
                     <li className="flex gap-2">
                        <span className="font-bold">•</span>
                        <span>Include salary range to attract 40% more candidates.</span>
                     </li>
                  </ul>
               </div>

               <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-2">Need Help?</h4>
                  <p className="text-gray-500 text-sm mb-4">Contact our support team if you have any issues posting your job.</p>
                  <button className="text-blue-600 text-sm font-semibold hover:underline">Contact Support</button>
               </div>
            </motion.div>
        
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

