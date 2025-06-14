const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Generate JWT token
const generateToken = (user) => {
  let expiresIn = "7d";

  if (user.role === "AdminEvent" || user.role === "AdminProduct") {
    expiresIn = "12h";
  }

  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn }
  );
};

// @desc Register Buyer
exports.registerBuyer = async (req, res) => {
  const { username, password, name, email, phone, gender, dateOfBirth, role } =
    req.body;

  try {
    const existingUser = await User.findOne({
      username: username.toLowerCase(),
    });
    if (existingUser)
      return res.status(400).json({ message: "Username already exists." });

    const buyer = await User.create({
      username,
      password, // <-- plain password, let Mongoose hash it
      name,
      email,
      phone,
      gender,
      dateOfBirth,
      role,
    });

    const token = generateToken(buyer);

    res.status(201).json({
      message: "Account successfully registered!",
      token,
      user: {
        id: buyer._id,
        username: buyer.username,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Login User
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) return res.status(400).json({ message: "User not found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password." });

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get Current User Info
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/auth/logout
exports.logout = async (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};
