import FloodPing from "../models/FloodPing.js";
import { gfs } from "../config/storage.js";

// GET "/floods"
export const getFloodPings = async function (req, res) {
  try {
    // Retrieve all flood pings
    const floodPings = await FloodPing.find({});

    // For each flood ping, retrieve the associated image from GridFS
    const floodPingsWithImages = await Promise.all(
      floodPings.map(async (ping) => {
        if (ping.image) {
          const file = await gfs.find({ _id: ping.image }).toArray();
          if (file.length > 0) {
            const imageUrl = `/api/files/${file[0].filename}`; // Generate the image URL
            return {
              ...ping._doc,
              imageUrl, // Add the image URL to the flood ping
            };
          }
        }
        return ping._doc;
      }),
    );

    res.status(200).json(floodPingsWithImages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// POST "/flood/add"
export const addFloodPing = async function (req, res) {
  try {
    const { author_id, path, status, comment } = req.body;
    console.log(comment);
    const new_flood = new FloodPing({
      author_id: author_id,
      path: path,
      status: status,
      comment: comment,
      image: req.file?.buffer,
    });

    console.log(author_id);
    console.log(path);

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
