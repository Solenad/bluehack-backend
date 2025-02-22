// assisted with AI
export const uploadSingleFile = async function (req, res) {
  if (!req.file) {
    return res.status(404).json({ message: "No file uploaded." });
  }

  res.status(201).json({
    message: "File uploaded successfully",
    filename: req.file.originalname,
    size: req.file.size,
  });
};
