import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import Grid from "gridfs-stream";
import mongoose from "mongoose";
import "dotenv/config";

const mongo_uri = `${process.env.MONGO_URI}/${process.env.DB_NAME}`;

let gfs, storage;

const conn = mongoose.connection;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");

  storage = new GridFsStorage({
    url: mongo_uri,
    file: function (req, file) {
      return {
        filename: `${Date.now()}-${file.originalname}`,
        bucketName: "uploads",
      };
    },
  });
});

const upload = multer({ storage });

export { gfs, upload };
