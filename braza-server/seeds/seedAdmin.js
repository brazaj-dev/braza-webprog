import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import { fileURLToPath } from "url";

const seedAdmin = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    const adminExists = await User.findOne({ type: "admin" });
    if (adminExists) {
      console.log("Admin user already exists:", adminExists.email);
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({
      firstName: "Admin",
      lastName: "User",
      email: "admin@animalhub.com",
      username: "admin",
      password: hashedPassword,
      type: "admin",
      age: "25",
      gender: "other",
      contactNumber: "1234567890",
      address: "Admin Office",
      isActive: true,
    });

    console.log("✅ Admin user created successfully!");
    console.log("Email: admin@animalhub.com");
    console.log("Username: admin");
    console.log("Password: admin123");

    const userExists = await User.findOne({ username: "user" });
    if (!userExists) {
      const hashedUserPassword = await bcrypt.hash("user123", 10);
      await User.create({
        firstName: "Normal",
        lastName: "User",
        email: "user@animalhub.com",
        username: "user",
        password: hashedUserPassword,
        type: "viewer",
        age: "25",
        gender: "other",
        contactNumber: "1234567890",
        address: "User Home",
        isActive: true,
      });
      console.log("✅ User created successfully!");
      console.log("Email: user@animalhub.com");
      console.log("Username: user");
      console.log("Password: user123");
    }

    console.log("\n⚠️  Please change the passwords after first login!");
  } catch (error) {
    console.error("Error seeding admin:", error.message);
  }
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedAdmin();
}

export default seedAdmin;
