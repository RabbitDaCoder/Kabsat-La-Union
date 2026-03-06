import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { uploadToCloudinary } from "../config/cloudinary.js";
import Room from "../models/Room.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Room data to seed
const roomsData = [
  {
    name: "Superior Room",
    category: "standard",
    basePrice: 4150,
    currency: "PHP",
    includedGuests: 4,
    maxGuests: 4,
    extraGuestPrice: 1200,
    description:
      "Comfortable resort room suitable for small groups and families.",
    amenities: [
      "Air Conditioning",
      "Free WiFi",
      "TV",
      "Private Bathroom",
      "Toiletries",
    ],
    totalRooms: 5,
  },
  {
    name: "Deluxe Swim-up Room",
    category: "deluxe",
    basePrice: 5150,
    currency: "PHP",
    includedGuests: 4,
    maxGuests: 4,
    extraGuestPrice: 1200,
    description: "Premium swim-up room with direct access to the resort pool.",
    amenities: [
      "Air Conditioning",
      "Free WiFi",
      "TV",
      "Pool Access",
      "Private Bathroom",
      "Mini Fridge",
    ],
    totalRooms: 3,
  },
  {
    name: "Ocean View Room",
    category: "deluxe",
    basePrice: 4850,
    currency: "PHP",
    includedGuests: 2,
    maxGuests: 3,
    extraGuestPrice: 1200,
    description:
      "Elegant ocean-facing room featuring a private balcony and relaxing coastal views, ideal for couples or small groups.",
    amenities: [
      "Air Conditioning",
      "Free WiFi",
      "TV",
      "Ocean View",
      "Private Balcony",
      "Private Bathroom",
    ],
    totalRooms: 4,
  },
  {
    name: "Premier Family Room",
    category: "suite",
    basePrice: 6950,
    currency: "PHP",
    includedGuests: 6,
    maxGuests: 8,
    extraGuestPrice: 1200,
    description: "Large family room ideal for medium-sized groups.",
    amenities: [
      "Air Conditioning",
      "Free WiFi",
      "TV",
      "Multiple Beds",
      "Private Bathroom",
      "Living Area",
    ],
    totalRooms: 3,
  },
  {
    name: "Standard Poolside Room",
    category: "suite",
    basePrice: 8150,
    currency: "PHP",
    includedGuests: 10,
    maxGuests: 10,
    extraGuestPrice: 1200,
    description: "Spacious poolside room perfect for group stays.",
    amenities: [
      "Air Conditioning",
      "Free WiFi",
      "TV",
      "Pool View",
      "Multiple Beds",
      "Private Bathroom",
      "Kitchenette",
    ],
    totalRooms: 2,
  },
  {
    name: "Honeymoon Suite",
    category: "suite",
    basePrice: 12500,
    currency: "PHP",
    includedGuests: 2,
    maxGuests: 2,
    extraGuestPrice: 1200,
    description:
      "Romantic luxury suite designed for couples, featuring a king bed, private lounge area, and premium resort amenities.",
    amenities: [
      "Air Conditioning",
      "Free WiFi",
      "Smart TV",
      "King Bed",
      "Private Lounge",
      "Jacuzzi",
      "Room Service",
      "Champagne",
    ],
    totalRooms: 2,
  },
  {
    name: "Luxury Pool Villa 3BR",
    category: "bungalow",
    basePrice: 17750,
    currency: "PHP",
    includedGuests: 12,
    maxGuests: 15,
    extraGuestPrice: 1200,
    description:
      "Three-bedroom luxury villa with private pool and premium resort amenities.",
    amenities: [
      "Air Conditioning",
      "Free WiFi",
      "Smart TV",
      "Private Pool",
      "3 Bedrooms",
      "Full Kitchen",
      "Living Room",
      "Garden",
    ],
    totalRooms: 1,
  },
  {
    name: "Presidential Suite",
    category: "bungalow",
    basePrice: 25000,
    currency: "PHP",
    includedGuests: 20,
    maxGuests: 35,
    extraGuestPrice: 1200,
    description:
      "Ultra-premium presidential suite designed for very large groups and events.",
    amenities: [
      "Air Conditioning",
      "Free WiFi",
      "Smart TV",
      "Private Pool",
      "Multiple Bedrooms",
      "Full Kitchen",
      "Event Space",
      "Butler Service",
    ],
    totalRooms: 1,
  },
];

// Path to images folder
const imagesFolder = path.resolve(
  __dirname,
  "../../frontend/src/assets/images",
);

/**
 * Find matching images for a room name
 */
function findRoomImages(roomName) {
  try {
    const files = fs.readdirSync(imagesFolder);
    const matchingFiles = files.filter((file) =>
      file.toLowerCase().startsWith(roomName.toLowerCase()),
    );
    return matchingFiles.sort(); // Sort to ensure consistent ordering (1, 2, 3)
  } catch (error) {
    console.error(`Error reading images folder: ${error.message}`);
    return [];
  }
}

/**
 * Upload an image file to Cloudinary
 */
async function uploadImage(filePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const result = await uploadToCloudinary(fileBuffer, {
      folder: "kabsat-la-union/rooms",
    });
    return result.secure_url;
  } catch (error) {
    console.error(`Failed to upload ${filePath}: ${error.message}`);
    return null;
  }
}

/**
 * Seed rooms with images
 */
async function seedRoomsWithImages() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing rooms
    await Room.deleteMany({});
    console.log("🗑️  Cleared existing rooms");

    // Process each room
    for (const roomData of roomsData) {
      console.log(`\n📦 Processing: ${roomData.name}`);

      // Find matching images
      const imageFiles = findRoomImages(roomData.name);
      console.log(`   Found ${imageFiles.length} images`);

      // Upload images to Cloudinary
      const imageUrls = [];
      for (const imageFile of imageFiles) {
        const imagePath = path.join(imagesFolder, imageFile);
        console.log(`   📸 Uploading: ${imageFile}`);

        const url = await uploadImage(imagePath);
        if (url) {
          imageUrls.push(url);
          console.log(`   ✅ Uploaded: ${url.substring(0, 60)}...`);
        }
      }

      // Create room with images
      const room = await Room.create({
        ...roomData,
        price: roomData.basePrice,
        images: imageUrls,
        featuredImage: imageUrls[0] || null,
        isActive: true,
      });

      console.log(
        `   ✅ Created room: ${room.name} with ${imageUrls.length} images`,
      );
    }

    console.log("\n🎉 Seeding complete!");
    console.log(`   Total rooms created: ${roomsData.length}`);

    // Disconnect
    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

// Run the seeder
seedRoomsWithImages();
