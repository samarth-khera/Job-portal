const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure correct absolute path
const uploadPath = path.join(__dirname, "..", "uploads");

// Create the folder automatically if missing
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("Uploads folder created automatically:", uploadPath);
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // preserve extension
    const ext = path.extname(file.originalname);
    cb(null, `resume-${Date.now()}${ext}`);
  },
});

// Allowed file types (PDF, DOC, DOCX)
const fileFilter = (req, file, cb) => {
  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF, DOC, and DOCX are allowed."), false);
  }
};

// Final upload instance
const uploadResume = multer({ storage, fileFilter });

module.exports = uploadResume;
