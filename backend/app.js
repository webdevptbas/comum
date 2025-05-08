const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const articleRoutes = require("./routes/articleRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN, // replace with your frontend origin
    credentials: true, // optional: allow cookies and headers like Authorization
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/events", eventRoutes);

module.exports = app;
