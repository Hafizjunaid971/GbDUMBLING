// import { v2 as cloudinary } from "cloudinary";
// export const connectCloudinary = async () => {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });
// };


// config/cloudinaryUpload.js

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "GbDumbling", // Optional folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

export const upload = multer({ storage: storage });
