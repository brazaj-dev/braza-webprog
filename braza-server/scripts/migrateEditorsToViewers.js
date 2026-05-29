import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";

const migrate = async () => {
  try {
    if (mongoose.connection.readyState !== 1) await connectDB();

    const editors = await User.find({ type: "editor" });
    if (!editors.length) {
      console.log("No users with type 'editor' found.");
      process.exit(0);
    }

    for (const u of editors) {
      console.log(`Updating ${u.email || u.username} -> viewer`);
      u.type = "viewer";
      await u.save();
    }

    console.log(`Updated ${editors.length} user(s).`);
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err.message);
    process.exit(1);
  }
};

if (process.argv[1] === new URL(import.meta.url).pathname) migrate();

export default migrate;
