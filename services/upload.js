import { gfs, upload } from "../config/storage.js";

// made by AI (spent 4 hours debugging GFS, have mercy)
export const uploadSingleFile = async function (req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  try {
    const uploadStream = gfs.openUploadStream(req.file.originalname, {
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    uploadStream.end(req.file.buffer);

    uploadStream.on("finish", () => {
      res.status(201).json({
        message: "File uploaded successfully",
        filename: req.file.originalname,
        size: req.file.size,
        fileId: uploadStream.id,
      });
    });

    uploadStream.on("error", (error) => {
      res
        .status(500)
        .json({ message: "File upload failed", error: error.message });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// made by AI (spent 4 hours debugging GFS, have mercy)
export const getFileByFilename = async function (req, res) {
  const { filename } = req.params;

  try {
    const files = await gfs.find({ filename }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ message: "File not found." });
    }

    const file = files[0];
    const downloadStream = gfs.openDownloadStreamByName(filename);

    res.set("Content-Type", file.contentType || "application/octet-stream");
    res.set("Content-Disposition", `attachment; filename="${filename}"`);

    downloadStream.pipe(res);

    downloadStream.on("error", (error) => {
      res
        .status(500)
        .json({ message: "Error retrieving file", error: error.message });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
