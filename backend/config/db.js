const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.NEW_MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
