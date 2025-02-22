import Route from "../models/Route.js";
import axios from "axios";

// GET "/routes"
export const getRoutes = async function (req, res) {
  const routes = await Route.find({});
  res.status(200).json(routes);
};

// POST "/user/add"
export const createRoute = async function (req, res) {
  try {
    const flood = await User.create(req.body);

    res.status(200).json(flood);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

// used AI for this, faster coding
export const deleteRouteById = async function (req, res) {
  try {
    const { id } = req.body;
    const route = await Route.findByIdAndDelete(id);

    if (!route) {
      return res.status(404).json({ message: "Route not found." });
    }

    return res.status(200).json({ message: "Route deleted." });
  } catch (err) {
    return res.status(500).json({ message: `Error deleting Route: ${err}` });
  }
};

export const getDirections = async (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/directions/json`;
  const { origin, destination } = req.query;
  const { avoid } = req.body;

  if (!origin || !destination) {
    return res
      .status(400)
      .json({ error: "Origin and destination are required" });
  }

  try {
    const waypoints = avoid
      ? avoid.map((point) => `via:${point[0]},${point[1]}`).join("|")
      : null;

    const response = await axios.get(url, {
      params: {
        origin: origin,
        destination: destination,
        key: process.env.GOOGLE_API_KEY,
        mode: "walking",
        alternatives: false,
        waypoints: waypoints,
        optimize: true,
      },
    });

    if (response.data.status === "OK") {
      return res.status(200).json(response.data);
    } else {
      return res.status(400).json({ error: response.data.status });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error fetching directions: ${error.message}` });
  }
};
