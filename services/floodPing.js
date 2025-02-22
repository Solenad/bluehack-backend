import FloodPing from "../models/FloodPing.js";

// GET "/floods"
export const getFloodPings = async function (req, res) {
  const floods = await FloodPing.find({});
  console.log("image: ", floods.image);
  res.status(200).json(floods);
};

// POST "/flood/add"
export const addFloodPing = async function (req, res) {
  try {
    const { author_id, path, status, comment } = req.body;

    const new_flood = new FloodPing({
      author_id: author_id,
      path: path,
      status: status,
      comment: comment,
      image: req.file?.buffer,
    });

    const saved_flood = await new_flood.save();

    res.status(201).json(saved_flood);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

// used AI for this, faster coding
export const deleteFloodPingById = async function (req, res) {
  try {
    const { id } = req.body;
    const flood = await FloodPing.findByIdAndDelete(id);

    if (!flood) {
      return res.status(404).json({ message: "Flood not found." });
    }

    return res.status(200).json({ message: "Flood deleted." });
  } catch (err) {
    return res.status(500).json({ message: `Error deleting Flood: ${err}` });
  }
};
