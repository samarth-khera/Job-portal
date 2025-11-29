const fs = require("fs");
const path = require("path");
const User = require("../models/User");

// ------------------------------
// @desc    Update user profile (name, avatar, company details)
// @route   PUT /api/users/profile
// @access  Private
// ------------------------------
exports.updateProfile = async (req, res) => {
  try {
    const { name, avatar, companyName, companyDescription, companyLogo } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        avatar,
        companyName,
        companyDescription,
        companyLogo,
      },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ------------------------------
// @desc    Delete resume file (Jobseeker only)
// @route   POST /api/users/resume
// @access  Private
// ------------------------------
exports.deleteResume = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.resume) {
      const filePath = path.join(__dirname, "..", user.resume);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      user.resume = "";
      await user.save();
    }

    res.json({ message: "Resume removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ------------------------------
// @desc    Get user public profile
// @route   GET /api/users/:id
// @access  Public
// ------------------------------
exports.getPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-password -email"
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
