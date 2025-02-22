import mongoose from "mongoose";
import pointSchema from "./Point.js";

const evacSchema = mongoose.Schema({
  name: { type: String, required: true },
  location: {
    type: pointSchema,
    required: true,
  },
  current_occupancy: Number,
  estimated_capacity: Number,
  status: {
    type: String,
    enum: ["Full", "Vacant"],
    required: true,
  },
  feedbacks: [String],
});

evacSchema.index({ location: "2dsphere" });
export default mongoose.model("Evacuation Area", evacSchema);
