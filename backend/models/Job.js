// backend/models/Job.js
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: String, required: true },
    location: { type: String },
    category: { type: String },

    // job type
    type: {
      type: String,
      enum: ["Remote", "Full-Time", "Part-Time", "Internship", "Contract"],
      required: true,
    },

    // reference to employer (User)
    company: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    salaryMin: { type: Number },
    salaryMax: { type: Number },

    // whether the job is still open
    isClosed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
