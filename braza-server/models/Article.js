import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  cardTitle: { type: String, default: "" },
  cardDescription: { type: String, default: "" },
  description: { type: String, default: "" },
  types: { type: [String], default: [] },
  image: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Article", articleSchema);
