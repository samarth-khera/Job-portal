const Application = require("../models/Application");
const Job = require("../models/Job");


exports.applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;

    const alreadyApplied = await Application.findOne({ job: jobId, applicant: userId });
    if (alreadyApplied) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    const application = await Application.create({
      job: jobId,
      applicant: userId,
      resume: req.user.resume, // user resume path
      status: "Applied"
    });

    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get logged-in user's applications
// @route   GET /api/applications/my
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate("job");

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all applicants for a job (Employer)
// @route   GET /api/applications/job/:jobId
exports.getApplicantsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // ensure employer owns the job
    if (job.company.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const applicants = await Application.find({ job: jobId })
      .populate("applicant", "-password");

    res.json(applicants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get application by ID (Jobseeker or Employer)
// @route   GET /api/applications/:id
exports.getSingleApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("job")
      .populate("applicant", "-password");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update application status (Employer)
// @route   PUT /api/applications/:id/status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const job = await Job.findById(application.job);

    // ensure only employer can update
    if (job.company.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    application.status = status || application.status;
    await application.save();

    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
