import mongoose from "mongoose";
import pointSchema from "./Point.js";

// slight debugging assistance by AI
const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  home_address: {
    type: pointSchema,
    required: true,
  },
  status: { type: String, enum: ["Safe", "Needs Rescue"] },
  // urgency_level: { type: String, required: true },
  // latest_ping_date: Date
});

// assisted by AI
userSchema.index({ home_address: "2dsphere" });

export default mongoose.model("User", userSchema);
