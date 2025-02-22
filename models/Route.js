import mongoose from "mongoose";
import pointSchema from "./Point.js";

const routeSchema = mongoose.Schema({
  origin: { type: pointSchema, required: true },
  destination: { type: pointSchema, required: true },
  distance_meters: { type: Number, required: true },
  duration_seconds: { type: Number, required: true },
});

routeSchema.index({ origin: "2dsphere" });
routeSchema.index({ destination: "2dsphere" });

export default mongoose.model("Route", routeSchema);
