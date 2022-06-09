import express from "express";
const app = express();
import logger from "./startup/logger.js";
import router from "./startup/routes.js";

router(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  logger.info(`Listening on Port ${port}...`);
});
