import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

/**
 * Cloudinary Configuration for Kabsat La Union
 * Handles image uploads and storage
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file buffer to Cloudinary
 * @param {Buffer} file - File buffer to upload
 * @param {Object} options - Upload options
 * @returns {Promise<Object>} Cloudinary upload result
 */
export const uploadToCloudinary = async (file, options = {}) => {
  const defaultOptions = {
    folder: "kabsat-la-union/rooms",
    resource_type: "image",
    transformation: [
      { width: 1920, height: 1080, crop: "limit" },
      { quality: "auto:best" },
      { fetch_format: "auto" },
    ],
  };

  const uploadOptions = { ...defaultOptions, ...options };

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
    if (Buffer.isBuffer(file)) {
      uploadStream.end(file);
    } else {
      reject(new Error("Invalid file format"));
    }
  });
};

/**
 * Delete an image from Cloudinary
 * @param {string} publicId - Cloudinary public ID
 * @returns {Promise<Object>} Deletion result
 */
export const deleteFromCloudinary = async (publicId) => {
  return cloudinary.uploader.destroy(publicId);
};

export default cloudinary;
