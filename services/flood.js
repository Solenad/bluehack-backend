import Flood from "../models/Flood.js";

// GET "/floods"
export const getFloods = async function (req, res) {
  const floods = await Flood.find({});
  console.log("image: ", floods.image);
  res.status(200).json(floods);
};

// POST "/flood/add"
export const addFloods = async function (req, res) {
  try {
    const { author_id, path, status, comment } = req.body;

    const new_flood = new Flood({
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
export const deleteFloodById = async function (req, res) {
  try {
    const { id } = req.body;
    const flood = await Flood.findByIdAndDelete(id);

    if (!flood) {
      return res.status(404).json({ message: "Flood not found." });
    }

    return res.status(200).json({ message: "Flood deleted." });
  } catch (err) {
    return res.status(500).json({ message: `Error deleting Flood: ${err}` });
  }
};
