import Flood from "../models/Flood.js";

// GET "/floods"
export const getFloods = async function (req, res) {
  const floods = await Evac.find({});
  res.status(200).json(floods);
};

// POST "/flood/add"
export const addFloods = async function (req, res) {
  try {
    const floods = await Evac.create(req.body);

    res.status(200).json(floods);
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
