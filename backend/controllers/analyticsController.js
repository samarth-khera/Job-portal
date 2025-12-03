const Job = require("../models/Job");
const Application = require("../models/Application");

const getTrend = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

exports.getEmployerAnalytics = async (req, res) => {
  try {
    const employerId = req.user._id;

    const now = new Date();
    const last7 = new Date();
    last7.setDate(now.getDate() - 7);

    const prev7 = new Date();
    prev7.setDate(now.getDate() - 14);

    // EMPLOYER JOBS
    const employerJobs = await Job.find({ company: employerId }).select("_id");
    const jobIds = employerJobs.map((job) => job._id);

    // TOTAL ACTIVE JOBS
    const totalActive = await Job.countDocuments({
      company: employerId,
      isClosed: false,
    });

    // TOTAL APPLICANTS
    const totalApplicants = await Application.countDocuments({
      job: { $in: jobIds },
    });

    // ACTIVE JOBS TREND
    const activeLast = await Job.countDocuments({
      company: employerId,
      createdAt: { $gte: last7, $lte: now },
    });

    const activePrev = await Job.countDocuments({
      company: employerId,
      createdAt: { $gte: prev7, $lte: last7 },
    });

    // APPLICATION TREND
    const appsLast = await Application.countDocuments({
      job: { $in: jobIds },
      createdAt: { $gte: last7, $lte: now },
    });

    const appsPrev = await Application.countDocuments({
      job: { $in: jobIds },
      createdAt: { $gte: prev7, $lte: last7 },
    });

    // HIRED
    const hiredLast = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Accepted",
      createdAt: { $gte: last7, $lte: now },
    });

    const hiredPrev = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Accepted",
      createdAt: { $gte: prev7, $lte: last7 },
    });

    // RECENT JOBS
    const recentJobs = await Job.find({ company: employerId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      activeJobs: { count: totalActive, trend: getTrend(activeLast, activePrev) },
      totalApplicants: { count: totalApplicants, trend: getTrend(appsLast, appsPrev) },
      hired: { count: hiredLast, trend: getTrend(hiredLast, hiredPrev) },
      recentJobs,
    });
  } catch (err) {
    console.error("Analytics Error:", err);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
};
