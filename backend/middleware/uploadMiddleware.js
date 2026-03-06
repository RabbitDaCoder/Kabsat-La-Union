import multer from "multer";
import { uploadToCloudinary } from "../config/cloudinary.js";

/**
 * Multer configuration for file uploads
 * Uses memory storage for Cloudinary streaming
 */
const storage = multer.memoryStorage();

/**
 * File filter - only allow images
 */
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.",
      ),
      false,
    );
  }
};

/**
 * Multer upload instance
 */
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 10,
  },
});

/**
 * Middleware to upload images to Cloudinary
 * Processes both file uploads and URL pastes
 */
export const uploadImagesToCloudinary = async (req, res, next) => {
  try {
    const imageUrls = [];

    // Handle file uploads
    if (req.files && req.files.length > 0) {
      console.log(`📸 Uploading ${req.files.length} images to Cloudinary...`);

      const uploadPromises = req.files.map(async (file) => {
        const result = await uploadToCloudinary(file.buffer, {
          folder: "kabsat-la-union/rooms",
        });
        return result.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      imageUrls.push(...uploadedUrls);
      console.log(`✅ Successfully uploaded ${uploadedUrls.length} images`);
    }

    // Handle pasted URLs
    if (req.body.imageUrls) {
      let urls = req.body.imageUrls;

      // Parse if it's a JSON string
      if (typeof urls === "string") {
        try {
          urls = JSON.parse(urls);
        } catch {
          // If not valid JSON, split by comma
          urls = urls
            .split(",")
            .map((url) => url.trim())
            .filter(Boolean);
        }
      }

      // Validate URLs
      const validUrls = urls.filter((url) => {
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      });

      imageUrls.push(...validUrls);
      console.log(`📎 Added ${validUrls.length} pasted image URLs`);
    }

    // Store processed URLs for controller
    req.processedImageUrls = imageUrls;
    next();
  } catch (error) {
    console.error("❌ Image upload error:", error.message);
    next(error);
  }
};

export default upload;
