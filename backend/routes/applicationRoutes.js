const express = require("express");
const {
  applyToJob,
  getMyApplications,
  getApplicantsForJob,
  getSingleApplicationById,
  updateStatus
} = require("../controllers/applicationController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/:jobId", protect, applyToJob);

router.get("/my", protect, getMyApplications);

// @route  GET /api/applications/job/:jobId
// @desc   Get applicants for a specific job (Employer)
router.get("/job/:jobId", protect, getApplicantsForJob);

// @route  GET /api/applications/:id
// @desc   Get single application by ID
router.get("/:id", protect, getSingleApplicationById);

// @route  PUT /api/applications/:id/status
// @desc   Update application status (Employer)
router.put("/:id/status", protect, updateStatus);

module.exports = router;
