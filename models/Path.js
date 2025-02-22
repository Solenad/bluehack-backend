import mongoose from "mongoose";

const pathSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["LineString"],
    required: true,
  },
  coordinates: {
    type: [],
    required: true,
  },
});

export default pathSchema;
