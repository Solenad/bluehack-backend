import Report from "../models/Report.js";

// GET "/evac-areas"
export const getReports = async function (req, res) {
  const reports = await Report.find();
  res.status(200).json(reports);
};

export const addReport = async function (req, res) {
  try {
    const report = await Report.create(req.body);

    res.status(200).json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteReportById = async function (req, res) {
  try {
    const { id } = req.body;
    const report = await Report.findByIdAndDelete(id);

    if (!report) {
      return res.status(404).json({ message: "Report not found." });
    }

    return res.status(200).json({ message: "Report deleted." });
  } catch (err) {
    return res.status(500).json({ message: `Error deleting Route: ${err}` });
  }
};
