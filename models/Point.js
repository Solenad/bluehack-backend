import mongoose from "mongoose";

// referenced from https://mongoosejs.com/docs/geojson.html
const pointSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

export default pointSchema;
