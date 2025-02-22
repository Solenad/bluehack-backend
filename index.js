import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/routes.js";
import "dotenv/config";

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
  .then(function () {
    console.log(`Connected to DB: ${mongoose.connection.name}`);
  })
  .catch(function (err) {
    console.error("Error connecting to DB: ", err);
  });

mongoose.connection.once("open", async function () {
  console.log(`Connected to DB: ${mongoose.connection.name}`);

  try {
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log("Available collections:");
    collections.forEach((collection) => console.log(` - ${collection.name}`));
  } catch (err) {
    console.error("Error listing collections: ", err);
  }
});

app.use("/", routes);

app.get("/", function (req, res) {
  res.status(200).send("Hello World!");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
  console.log(`Bluehacks backend running on ${PORT}`);
});
