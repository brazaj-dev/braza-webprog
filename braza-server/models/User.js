import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: String, default: "" },
  gender: { type: String, default: "" },
  contactNumber: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  type: {
    type: String,
    enum: ["admin", "editor", "viewer"],
    default: "viewer",
  },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, default: "" },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
