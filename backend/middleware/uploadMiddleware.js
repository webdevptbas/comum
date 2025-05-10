// middleware/uploadMiddleware.js
const multer = require("multer");
const path = require("path");

// Configure storage (optional if you don't need to store locally)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // You can skip saving if Synology handles this
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

const upload = multer({
  storage,
  limits: { files: 5 },
  fileFilter,
}).array("images", 5);

const uploadThumbnail = multer({
  storage,
  fileFilter,
}).single("thumbnail");

module.exports = {
  upload,
  uploadThumbnail,
};
