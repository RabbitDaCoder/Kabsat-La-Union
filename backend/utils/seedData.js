import mongoose from "mongoose";
import dotenv from "dotenv";
import Room from "../models/Room.js";
import Booking from "../models/Booking.js";

dotenv.config();

/**
 * Seed Database with sample La Union surf resort data
 * Run: node utils/seedData.js
 */

const sampleRooms = [
  {
    name: "Ocean Breeze Standard",
    description:
      "Wake up to the sound of crashing waves in our cozy Ocean Breeze Standard rooms. Located just steps from the famous La Union surf break, these rooms feature minimalist coastal design with warm wood accents, a queen-size bed with premium linens, and a private balcony where you can watch surfers ride the morning swells. Perfect for solo travelers and couples seeking an authentic surf town experience.",
    price: 3500,
    totalRooms: 10,
    maxGuests: 2,
    category: "standard",
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
    ],
    amenities: [
      "Queen-size bed",
      "Private balcony",
      "Air conditioning",
      "Complimentary WiFi",
      "Hot shower",
      "Mini fridge",
      "Daily housekeeping",
      "Beach towels",
    ],
    seasonalDiscount: {
      isActive: true,
      percentage: 15,
      startDate: new Date("2026-03-01"),
      endDate: new Date("2026-05-31"),
    },
  },
  {
    name: "Surfside Deluxe",
    description:
      "Elevated comfort meets coastal charm in our Surfside Deluxe rooms. Featuring a spacious open layout with floor-to-ceiling windows framing the Pacific Ocean, these rooms include a king-size bed, a lounge area with rattan furniture, and an outdoor rain shower. Surf rack storage is provided because we know mornings are for catching waves.",
    price: 5500,
    totalRooms: 8,
    maxGuests: 3,
    category: "deluxe",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
    ],
    amenities: [
      "King-size bed",
      "Ocean view balcony",
      "Outdoor rain shower",
      "Lounge area",
      "Surf rack storage",
      "Smart TV",
      "Complimentary WiFi",
      "Mini bar",
      "Coffee machine",
    ],
  },
  {
    name: "Sunset Beach Bungalow",
    description:
      "Nestled among coconut palms with direct beach access, our Sunset Beach Bungalows are standalone oceanfront retreats. Each bungalow features a native Bahay Kubo-inspired design with modern comforts: a plush king bed, an open-air living area, a private outdoor bathtub, and a hammock on your personal patio. Watch the legendary La Union sunset paint the sky every evening.",
    price: 8000,
    totalRooms: 6,
    maxGuests: 4,
    category: "bungalow",
    images: [
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
    ],
    amenities: [
      "Direct beach access",
      "King-size bed",
      "Open-air living area",
      "Private outdoor bathtub",
      "Hammock patio",
      "Butler service",
      "Premium mini bar",
      "Complimentary WiFi",
      "Bonfire pit access",
      "Surfboard rental included",
    ],
    seasonalDiscount: {
      isActive: true,
      percentage: 10,
      startDate: new Date("2026-02-01"),
      endDate: new Date("2026-04-30"),
    },
  },
  {
    name: "Kabsat Family Suite",
    description:
      "Designed for families and friend groups, our Kabsat Family Suite offers generous living space across two connected bedrooms with a shared lounge and kitchenette. The suite features a tropical-modern aesthetic with local art, bamboo details, and a large terrace overlooking the resort gardens and ocean beyond. Kids will love the direct pool access.",
    price: 12000,
    totalRooms: 4,
    maxGuests: 6,
    category: "suite",
    images: [
      "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=800",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
    ],
    amenities: [
      "Two bedrooms",
      "Living room",
      "Kitchenette",
      "Large terrace",
      "Pool access",
      "Smart TV",
      "Complimentary WiFi",
      "Daily housekeeping",
      "BBQ grill access",
      "Board games collection",
    ],
  },
  {
    name: "Coastal Deluxe Twin",
    description:
      "Ideal for friends on a surf trip, our Coastal Deluxe Twin rooms feature two double beds, a shared workspace, and a private balcony with garden and partial ocean views. The room is designed with a laid-back surfer aesthetic — think reclaimed wood, local textiles, and sunset-toned accents. Board storage and outdoor showers make pre and post-surf routines effortless.",
    price: 4800,
    totalRooms: 6,
    maxGuests: 4,
    category: "deluxe",
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
    ],
    amenities: [
      "Two double beds",
      "Private balcony",
      "Surf rack storage",
      "Outdoor shower",
      "Workspace",
      "Air conditioning",
      "Complimentary WiFi",
      "Mini fridge",
      "Coffee maker",
    ],
  },
  {
    name: "Presidential Ocean Suite",
    description:
      "The crown jewel of Kabsat La Union, our Presidential Ocean Suite is a sprawling 120-sqm oceanfront haven. Floor-to-ceiling glass walls offer panoramic views of the surf break and coastline. Features include a private plunge pool, a rooftop deck, a full kitchen, a spa bathroom with soaking tub, and dedicated concierge service. Perfect for honeymoons and special celebrations.",
    price: 22000,
    totalRooms: 2,
    maxGuests: 4,
    category: "suite",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
    ],
    amenities: [
      "Private plunge pool",
      "Rooftop deck",
      "Panoramic ocean view",
      "King-size bed",
      "Full kitchen",
      "Spa bathroom",
      "Dedicated concierge",
      "Premium sound system",
      "Wine fridge",
      "Nespresso machine",
      "Complimentary surfing lessons",
      "Airport transfer included",
    ],
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Room.deleteMany({});
    await Booking.deleteMany({});
    console.log("🗑️ Cleared existing data");

    // Insert rooms
    const rooms = await Room.insertMany(sampleRooms);
    console.log(`✅ Inserted ${rooms.length} rooms`);

    // Create a sample confirmed booking
    const sampleBooking = {
      roomId: rooms[0]._id,
      guestName: "John Smith",
      email: "john.smith@example.com",
      checkIn: new Date("2026-03-15"),
      checkOut: new Date("2026-03-20"),
      guests: { adults: 2, children: 0 },
      totalAmount: 5100,
      paymentStatus: "confirmed",
      confirmedAt: new Date(),
    };

    await Booking.create(sampleBooking);
    console.log("✅ Created sample booking");

    console.log("\n🎉 Database seeded successfully!");
    console.log("\nSample Rooms:");
    rooms.forEach((room) => {
      console.log(
        `  - ${room.name}: ₱${room.price}/night (${room.totalRooms} available)`,
      );
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();
