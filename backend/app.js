const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
dotenv.config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const articleRoutes = require("./routes/articleRoutes");
const eventRoutes = require("./routes/eventRoutes");
const pastEvent = require("./routes/pastEventRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const brandRoutes = require("./routes/brandRoutes");
const brandTypeRoutes = require("./routes/brandTypeRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const rajaOngkirRoutes = require("./routes/rajaOngkirRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
connectDB();

const allowedOrigins = [
  (process.env.FRONTEND_ORIGIN || "").trim(),
  (process.env.ADMIN_ORIGIN || "").trim(),
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

app.use(express.json({ limit: "2mb" }));

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser middleware
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/past-events", pastEvent);
app.use("/api/subscribe", subscriptionRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/brand-types", brandTypeRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/rajaongkir", rajaOngkirRoutes);
app.use("/api/orders", orderRoutes);

module.exports = app;
