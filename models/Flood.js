import mongoose from "mongoose";

const floodSchema = mongoose.Schema({
  // ObjectId learned from AI
  path: {
    type: {
      type: String,
      enum: ["LineString"],
      required: true,
    },
    coordinates: {
      type: [[Number]],
      required: true,
    },
  },
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
floodSchema.index({ path: "2dsphere" });
export default mongoose.model("Flood", floodSchema);
