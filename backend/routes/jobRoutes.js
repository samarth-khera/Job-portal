const express = require("express");
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  toggleCloseJob,
  getJobsByEmployer
} = require("../controllers/jobController");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Create new job (Employer only)
router.route("/")
  .post(protect, createJob)
  .get(getJobs);

// Get employer’s jobs
router.route("/employer").get(protect, getJobsByEmployer);

// Get, update & delete single job
router
  .route("/:id")
  .get(getJobById)
  .put(protect, updateJob)
  .delete(protect, deleteJob);

// Toggle job closed/open
router.put("/:id/toggle-close", protect, toggleCloseJob);

module.exports = router;
