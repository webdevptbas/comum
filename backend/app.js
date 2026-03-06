const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const articleRoutes = require("./routes/articleRoutes");
const eventRoutes = require("./routes/eventRoutes");
const pastEvent = require("./routes/pastEventRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const brandRoutes = require("./routes/brandRoutes");
const brandTypeRoutes = require("./routes/brandTypeRoutes");

const app = express();
dotenv.config();
connectDB();

const allowedOrigins = [
  (process.env.FRONTEND_ORIGIN || "").trim(),
  (process.env.ADMIN_ORIGIN || "").trim(),
  "https://www.comumspace.com",
  "http://192.168.18.5:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.warn("🚫 Blocked Origin:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// 🚨 For development only!
// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//   }),
// );

app.use(express.json({ limit: "2mb" }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/past-events", pastEvent);
app.use("/api/subscribe", subscriptionRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/brand-types", brandTypeRoutes);

module.exports = app;
