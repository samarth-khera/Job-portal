const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const { getEmployerAnalytics } = require("../controllers/analyticsController");

// FINAL route = /api/analytics/overview
router.get("/overview", protect, getEmployerAnalytics);

module.exports = router;
