const jwt = require("jsonwebtoken");

exports.generateToken = (res, user) => {
  let expiresIn = "7d";

  const isAdmin = user.role === "AdminEvent" || user.role === "AdminProduct";

  if (isAdmin) {
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

  const maxAge =
    user.role === "Buyer" ? 7 * 24 * 60 * 60 * 1000 : 1 * 12 * 60 * 60 * 1000;

  const cookieName = isAdmin ? "admin_jwt" : "jwt";

  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge,
  });
};
