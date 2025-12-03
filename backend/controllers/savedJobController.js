const SavedJob = require("../models/SavedJob");

// @desc    Save a job
// @route   POST /api/saved-jobs/:jobId
// @access  Private (Jobseeker)
exports.saveJob = async (req, res) => {
  try {
    const saved = await SavedJob.create({
      jobseeker: req.user.id,
      job: req.params.jobId,
    });

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to save job", error: err.message });
  }
};

// @desc    Unsave a job
// @route   DELETE /api/saved-jobs/:jobId
// @access  Private
exports.unsaveJob = async (req, res) => {
  try {
    await SavedJob.findOneAndDelete({
      jobseeker: req.user.id,
      job: req.params.jobId,
    });

    res.json({ message: "Job removed from saved list" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to remove saved job", error: err.message });
  }
};

// @desc    Get all saved jobs for current user
// @route   GET /api/saved-jobs
// @access  Private
exports.getMySavedJobs = async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({ jobseeker: req.user.id })
      .populate("job") // populate job details
      .sort({ createdAt: -1 });

    res.json(savedJobs);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch saved jobs", error: err.message });
  }
};
