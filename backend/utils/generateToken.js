const jwt = require("jsonwebtoken");

exports.generateToken = (res, user) => {
  let expiresIn = "7d";

  if (user.role === "AdminEvent" || user.role === "AdminProduct") {
    expiresIn = "12h";
  }

  const token = jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn },
  );

  // st JWT as  HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};
