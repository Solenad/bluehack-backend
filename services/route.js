import Route from "../models/Route.js";

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
