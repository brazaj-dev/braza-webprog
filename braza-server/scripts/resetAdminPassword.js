import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { fileURLToPath } from "url";
import connectDB from "../config/db.js";
import User from "../models/User.js";

const resetPassword = async (identifier, newPassword) => {
  try {
    if (!identifier || !newPassword) {
      console.log(
        "Usage: node scripts/resetAdminPassword.js <email|username> <newPassword>",
      );
      return process.exit(1);
    }

    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    // Try find by email first, then username
    let user = await User.findOne({ email: identifier });
    if (!user) {
      user = await User.findOne({ username: identifier });
    }

    if (!user) {
      console.error("No user found with that email or username.");
      return process.exit(1);
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.isActive = true;
    await user.save();

    console.log(`Password updated for user: ${user.email || user.username}`);
    process.exit(0);
  } catch (err) {
    console.error("Error resetting password:", err.message);
    process.exit(1);
  }
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const identifier = process.argv[2];
  const newPassword = process.argv[3];
  resetPassword(identifier, newPassword);
}

export default resetPassword;
