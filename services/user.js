import User from "../models/User.js";

// GET "/users"
export const getUsers = async function (req, res) {
  const users = await User.find({});
  res.status(200).json(users);
};

// POST "/user/add"
export const createUser = async function (req, res) {
  try {
    const user = await User.create(req.body);

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteUserById = async function (req, res) {
  try {
    const { id } = req.body;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ message: "User deleted." });
  } catch (err) {
    return res.status(500).json({ message: `Error deleting User: ${err}` });
  }
};
