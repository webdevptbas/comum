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

const app = express();
dotenv.config();
connectDB();

app.use(express.json({ limit: "2mb" }));
const allowedOrigins = [
  process.env.FRONTEND_ORIGIN,
  process.env.ADMIN_ORIGIN,
  "https://www.comumspace.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/past-events", pastEvent);
app.use("/api/subscribe", subscriptionRoutes);

module.exports = app;
