// backend/controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "60d" });
};

// ===========================================================
// REGISTER USER
// POST /api/auth/register
// ===========================================================
exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      avatar,
      role,
      companyName,
      companyLogo,
      companyDescription,
      resume
    } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar,
      role,
      companyName,
      companyLogo,
      companyDescription,
      resume,
    });
    console.log(user)

    return res.status(201).json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || "",
        companyName: user.companyName || "",
        companyDescription: user.companyDescription || "",
        companyLogo: user.companyLogo || "",
        resume: user.resume || "",
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ===========================================================
// LOGIN USER
// POST /api/auth/login
// ===========================================================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    console.log(user,"this is my user")
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });




    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch, user.password, password)
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    // SUCCESS RESPONSE (MATCHES FRONTEND)
    return res.json({
      token: generateToken(user._id),

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || "",
        companyName: user.companyName || "",
        companyDescription: user.companyDescription || "",
        companyLogo: user.companyLogo || "",
        resume: user.resume || "",
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ===========================================================
// GET AUTHENTICATED USER
// GET /api/auth/me
// ===========================================================
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    return res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
