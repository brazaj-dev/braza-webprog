import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/braza";

  // If already connected, skip
  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return;
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
  }

  // Only try in-memory fallback in development (package is a devDependency)
  if (process.env.NODE_ENV !== "production") {
    try {
      console.warn("Falling back to in-memory MongoDB for development.");
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      const mongoServer = await MongoMemoryServer.create();
      const conn = await mongoose.connect(mongoServer.getUri());
      console.log(`MongoDB Connected (in-memory): ${conn.connection.host}`);
      return;
    } catch (memoryError) {
      console.error(`In-memory MongoDB startup failed: ${memoryError.message}`);
    }
  }

  throw new Error("Failed to connect to MongoDB. Please check your MONGO_URI environment variable.");
};

export default connectDB;
