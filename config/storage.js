import multer from "multer";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";
import "dotenv/config";

let gfs;

const conn = mongoose.connection;
conn.once("open", () => {
  gfs = new GridFSBucket(conn.db, { bucketName: "uploads" });
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

export { gfs, upload };
