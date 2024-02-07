const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname) || ".jpg";
    const uniqueSuffix = `${Date.now()}`;
    cb(null, uniqueSuffix + fileExtension);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 80000000000000, // Compliant: 8MB
  },
  fileFilter,
}).single("media");

module.exports = { upload };
