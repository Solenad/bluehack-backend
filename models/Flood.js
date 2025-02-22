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
      "Passable (Mapadaan, No Flood)",
      "Ankle-Deep (Bababaw, Still Walkable)",
      "Knee-Deep (Hirap Na, Hard to Walk)",
      "Waist-Deep (Delikado, Dangerous Level)",
      "Chest-Deep (Bawal Na, No Entry)",
      "Unknown (Hindi Sigurado, Needs Verification)",
    ],
    required: true,
  },
  comment: String,
  image: { data: Buffer, imgType: String },
});
floodSchema.index({ path: "2dsphere" });
export default mongoose.model("Flood", floodSchema);
