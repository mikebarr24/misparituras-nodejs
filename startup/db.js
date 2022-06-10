import mongoose from "mongoose";
import logger from "./logger.js";
import config from "config";

export default function () {
  mongoose.connect(config.get("db")).then(() => {
    logger.info(`Connected to ${config.get("db")}`);
  });
}
