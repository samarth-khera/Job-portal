const Job = require("../models/Job");
const Application = require("../models/Application");

// ===============================================================
// CREATE JOB
// ===============================================================
exports.createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      type,
      category,
      mode,
      salaryMin,
      salaryMax,
      location,
    } = req.body;

    const job = await Job.create({
      title,
      description,
      requirements,
      type,
      category,
      mode,
      salaryMin,
      salaryMax,
      location,
      company: req.user._id, // logged-in employer
    });

    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================================================
// GET ALL JOBS (WITH FILTERS)
// ===============================================================
exports.getJobs = async (req, res) => {
  try {
    const { title, location, category, type, salaryMin, salaryMax } = req.query;

    // Build Query Object
    let query = {};

    if (title) {
      query.title = { $regex: title, $options: "i" }; // Case-insensitive search
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (type) {
      query.type = type;
    }

    if (salaryMin) {
      query.salaryMin = { $gte: Number(salaryMin) };
    }

    if (salaryMax) {
      query.salaryMax = { $lte: Number(salaryMax) };
    }

    // Execute Query
    const jobs = await Job.find(query)
      .populate("company", "name companyName companyLogo")
      .sort({ createdAt: -1 }); // Newest first

    res.json({ count: jobs.length, jobs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================================================
// GET JOBS BY EMPLOYER (WITH applicants count)
// ===============================================================
exports.getJobsByEmployer = async (req, res) => {
  try {
    const jobs = await Job.find({ company: req.user._id }).lean();

    const jobsWithCounts = await Promise.all(
      jobs.map(async (job) => {
        const count = await Application.countDocuments({ job: job._id });

        return {
          ...job,
          applicantsCount: count,   // ← IMPORTANT FIX
        };
      })
    );

    res.json(jobsWithCounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================================================
// GET SINGLE JOB BY ID
// ===============================================================
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "company",
      "name companyName companyLogo"
    );

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================================================
// UPDATE JOB
// ===============================================================
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.company.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================================================
// DELETE JOB
// ===============================================================
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.company.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await job.deleteOne();

    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================================================
// TOGGLE JOB CLOSE / OPEN
// ===============================================================
exports.toggleCloseJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.company.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    job.isClosed = !job.isClosed;
    await job.save();

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
