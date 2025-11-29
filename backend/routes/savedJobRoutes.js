const express = require("express");
const router = express.Router();

const {
  saveJob,
  unsaveJob,
  getMySavedJobs,
} = require("../controllers/savedJobController");

const { protect } = require("../middlewares/authMiddleware");

// Save a job
router.post("/:jobId", protect, saveJob);

// Unsave a job
router.delete("/:jobId", protect, unsaveJob);

// Get all saved jobs for logged-in user
router.get("/", protect, getMySavedJobs);

module.exports = router;
