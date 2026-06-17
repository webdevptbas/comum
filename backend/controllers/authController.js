const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/generateToken");

// @desc Register Buyer
// @route POST api/auth/register
// @access Public
exports.registerUser = async (req, res) => {
  const { username, password, name, email, phone, gender, dateOfBirth, role } =
    req.body;

  try {
    const existingUser = await User.findOne({
      username: username.toLowerCase(),
    });
    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

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

    generateToken(res, buyer);

    res.status(201).json({
      message: "Account successfully registered!",
      user: {
        _id: buyer._id,
        username: buyer.username,
        name: buyer.name,
        email: buyer.email,
        phone: buyer.phone,
        gender: buyer.gender,
        dateOfBirth: buyer.dateOfBirth,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Login User
// @route POST api/auth/login
// @access Public
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username.toLowerCase() });

    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    generateToken(res, user);

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Login admin
// @route POST api/auth/login
// @access Public
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username.toLowerCase() });

    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    generateToken(res, user);

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        name: user.name,
        role: user.role,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Logout user / clear cookie
// @route POST /api/auth/logout
// @access Private route
exports.logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout successful" });
};

// @desc Logout admin / clear cookie
// @route POST /api/auth/logout
// @access Private route
exports.logoutAdmin = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout successful" });
};

// @desc Get Current User Info for user themselves
// @route GET /api/auth/profile
// @access Private
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc update user profile by user themselves, no need any :id
// @route PUT /api/auth/profile
// @access Private
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.comparePassword(req.body.currentPassword);

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    user.password = req.body.newPassword;

    if (user) {
      user.name = req.body.name || user.name;
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      username: updatedUser.username,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc get all users
// @route GET /api/auth/users
// @access Private/admin
exports.getUsers = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc get user by :id
// @route GET /api/auth/:id
// @access Private/admin
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc delete users
// @route DELETE /api/auth/:id
// @access Private/admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc update users
// @route PUT /api/auth/:id
// @access Private/admin
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
