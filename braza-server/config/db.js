import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/braza";

  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return;
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
  }

  if (process.env.NODE_ENV !== "production") {
    try {
      console.warn("Falling back to in-memory MongoDB for development.");
      const mongoServer = await MongoMemoryServer.create();
      const conn = await mongoose.connect(mongoServer.getUri());
      console.log(`MongoDB Connected (in-memory): ${conn.connection.host}`);
      return;
    } catch (memoryError) {
      console.error(`In-memory MongoDB startup failed: ${memoryError.message}`);
    }
  }

  process.exit(1);
};

export default connectDB;
