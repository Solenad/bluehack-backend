import mongoose from "mongoose";
import pointSchema from "./Point.js";

const floodPingSchema = mongoose.Schema({
  path: {
    type: pointSchema,
    required: true,
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
  image: { type: mongoose.Schema.Types.ObjectId, ref: "uploads.files" },
});
floodPingSchema.index({ path: "2dsphere" });
export default mongoose.model("FloodPing", floodPingSchema);
