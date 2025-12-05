const Application = require("../models/Application");
const Job = require("../models/Job");

const getTrend = (current, previous) => {
  if (previous === 0 && current > 0) return 100;
  if (previous === 0 && current === 0) return 0;
  return (((current - previous) / previous) * 100).toFixed(1);
};

exports.getEmployerAnalytics = async (req, res) => {
  try {
    const employerId = req.user._id;

    const now = new Date();
    const last7 = new Date(now);
    last7.setDate(now.getDate() - 7);

    const prev7 = new Date(now);
    prev7.setDate(now.getDate() - 14);

    const employerJobs = await Job.find({ company: employerId }).select("_id");
    const jobIds = employerJobs.map(j => j._id);

    const totalActive = await Job.countDocuments({
      company: employerId,
      isClosed: false,
    });

    const totalApplicants = await Application.countDocuments({
      job: { $in: jobIds },
    });

    const activeLast = await Job.countDocuments({
      company: employerId,
      createdAt: { $gte: last7, $lte: now },
    });

    const activePrev = await Job.countDocuments({
      company: employerId,
      createdAt: { $gte: prev7, $lte: last7 },
    });

    const appsLast = await Application.countDocuments({
      job: { $in: jobIds },
      createdAt: { $gte: last7, $lte: now },
    });

    const appsPrev = await Application.countDocuments({
      job: { $in: jobIds },
      createdAt: { $gte: prev7, $lte: last7 },
    });

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

    const recentJobs = await Job.find({ company: employerId })
      .sort({ createdAt: -1 })
      .limit(5);

    const recentApplications = await Application.find({
      job: { $in: jobIds },
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("applicant", "name email")
      .populate("job", "title");

    res.json({
      activeJobs: { count: totalActive, trend: getTrend(activeLast, activePrev) },
      totalApplicants: { count: totalApplicants, trend: getTrend(appsLast, appsPrev) },
      hired: { count: hiredLast, trend: getTrend(hiredLast, hiredPrev) },
      recentJobs,
      recentApplications,
    });
  } catch (err) {
    console.error("Analytics Error:", err);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
};
