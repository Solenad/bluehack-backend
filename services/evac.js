import Evac from "../models/Evac.js";

// GET "/evac-areas"
export const getEvacAreas = async function (req, res) {
  const evac_areas = await Evac.find();
  res.status(200).json(evac_areas);
};

// POST "/evac-areas/add"
export const addEvacAreas = async function (req, res) {
  try {
    const { name, location, current_occupancy, estimated_capacity, feedbacks } =
      req.body;
    let status;

    if (current_occupancy > estimated_capacity) {
      return res
        .status(400)
        .json({ message: "Current occupancy exceeded capacity" });
    }

    if (current_occupancy < estimated_capacity) {
      status = "Vacant";
    } else {
      status = "Full";
    }

    const new_evac_area = new Evac({
      name: name,
      location: location,
      current_occupancy: current_occupancy,
      estimated_capacity: estimated_capacity,
      status: status,
      feedbacks: feedbacks,
    });

    const saved_evac_area = await new_evac_area.save();
    res.status(201).json(saved_evac_area);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

// used AI for this, faster coding
export const deleteEvacById = async function (req, res) {
  try {
    const { id } = req.body;
    const evac = await Evac.findByIdAndDelete(id);

    if (!evac) {
      return res.status(404).json({ message: "Evac area not found." });
    }

    return res.status(200).json({ message: "Evac area deleted." });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Error deleting Evac area: ${err}` });
  }
};
