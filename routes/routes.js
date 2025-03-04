import express from "express";
import { getUsers, createUser, deleteUserById } from "../services/user.js";
import {
  getEvacAreas,
  addEvacAreas,
  deleteEvacById,
} from "../services/evac.js";
import { getDirections } from "../services/route.js";
import { getFloods, addFloods, deleteFloodById } from "../services/flood.js";
import { getRoutes, createRoute, deleteRouteById } from "../services/route.js";
import {
  getFloodPings,
  addFloodPing,
  deleteFloodPingById,
} from "../services/floodPing.js";
import { upload } from "../config/storage.js";
import { uploadSingleFile, getFileByFilename } from "../services/upload.js";
import { getReports, addReport, deleteReportById } from "../services/report.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Hello, world!");
});

// Automated by AI, reduces labor and time
// User routes
router.get("/users", getUsers);
router.post("/users", createUser);
router.delete("/users", deleteUserById);

// Evacuation areas routes
router.get("/evac-areas", getEvacAreas);
router.post("/evac-areas", addEvacAreas);
router.delete("/evac-areas", deleteEvacById);

// Floods routes
router.get("/floods", getFloods);
router.post("/floods", addFloods);
router.delete("/floods", deleteFloodById);

// FloodPing routes
router.get("/flood-pings", getFloodPings);
router.post("/flood-pings", addFloodPing);
router.delete("/flood-pings", deleteFloodPingById);

// Routes routes
router.get("/routes", getRoutes);
router.post("/routes", createRoute);
router.delete("/routes", deleteRouteById);

// Upload route
router.post("/upload", upload.single("file"), uploadSingleFile);
router.get("/file/:filename", getFileByFilename);

// route route
router.get("/route", getDirections);

// Report routes
router.post("/reports", addReport);
router.get("/reports", getReports);
router.delete("/reports", deleteReportById);

export default router;
