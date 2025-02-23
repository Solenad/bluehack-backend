import mongoose from "mongoose";

const reportSchema = mongoose.Schema({
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: "uploads.files" },
  status: {
    type: String,
    enum: [
      "Ligtas (Safe)",
      "Nangangailangan ng Tulong (Need Help)",
      "Na-trap (Trapped)",
      "May Sugat (Injured)",
    ],
    required: true,
  },
  urgency: {
    type: String,
    enum: ["Mababa (Low)", "Katamtaman (Medium)", "Mataas (High)"],
    required: true,
  },
  additionals: String,
  image: { type: mongoose.Schema.Types.ObjectId, ref: "uploads.files" },
});

export default mongoose.model("Report", reportSchema);
