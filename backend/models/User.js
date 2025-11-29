// backend/models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


// User schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // role: either jobseeker or employer
    role: { type: String, enum: ["jobseeker", "employer"], required: true },

    // optional profile fields
    avatar: { type: String },    // url or path to uploaded image
    resume: { type: String },    // url or path to resume file

    // employer-specific fields (optional)
    companyName: { type: String },
    companyDescription: { type: String },
    companyLogo: { type: String }
  },
  { timestamps: true }
);

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  try {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) return next();

    const saltRounds = 10;
    const hashed = await bcrypt.hash(this.password, saltRounds);
    this.password = hashed;
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
