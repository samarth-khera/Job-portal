const express = require("express");
const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Register user
router.post("/register", register);

// Login user
router.post("/login", login);

// Get logged-in user
router.get("/me", protect, getMe);

// Upload image (profile picture / company logo)
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: "No file uploaded" });

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  res.status(200).json({ imageUrl });
});

module.exports = router;
