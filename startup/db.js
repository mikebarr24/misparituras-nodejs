import mongoose from "mongoose";
import logger from "./logger.js";

export default function () {
  mongoose.connect("mongodb://127.0.0.1:27017").then(() => {
    logger.info("Connected to MongoDb");
  });
}
