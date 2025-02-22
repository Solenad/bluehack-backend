import mongoose from "mongoose";
import pointSchema from "./Point.js";

const floodSchema = mongoose.Schema({
  // ObjectId learned from AI
  author_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  location: { type: pointSchema, required: true },
  status: {
    type: String,
    enum: [
      "Passable",
      "Ankle-Deep",
      "Knee-Deep",
      "Waist-Deep",
      "Chest-Deep",
      "Unknown",
    ],
    required: true,
  },
  comment: String,
  image: { data: Buffer, imgType: String },
});

floodSchema.index({ location: "2dsphere" });
export default mongoose.model("Flood", floodSchema);
