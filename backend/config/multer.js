// import multer from "multer";
// const storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     return cb(null, `${Date.now()}${file.originalname}`);
//   },
// });
// export const upload = multer({ storage: storage });


import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: "div3j8qow",
  api_key: "627861765986159",
  api_secret: "LfRNX0sBtlPumNOqk_WNOQr9Oyw",
});

// Cloudinary Storage Configuration for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',  // Cloudinary folder where the image will be saved
    allowed_formats: ['jpg', 'jpeg', 'png'],  // Supported file formats
  },
});

// Multer Setup with Cloudinary Storage
const upload = multer({ storage });
export { upload };

// Express App Setup
const app = express();

// POST route for uploading image
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Successfully uploaded, return the Cloudinary image URL
  const imageUrl = req.file.path;
  res.status(200).json({ message: 'File uploaded successfully!', imageUrl });
});

// Server listening on port 3000 (Vercel automatically handles in prod)
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
