const multer = require("multer");
const path = require("path");

// Ensure correct absolute path
const uploadPath = path.join(__dirname, "..", "uploads");

// Create the folder automatically if missing
const fs = require("fs");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("Uploads folder created automatically:", uploadPath);
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // Always correct location
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Allowed file types
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];

  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Invalid file type"), false);
};

// Final upload instance
const upload = multer({ storage, fileFilter });

module.exports = upload;
