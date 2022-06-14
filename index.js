const express = require("express");
const app = express();
const logger = require("./startup/logger.js");
const router = require("./startup/routes.js");
const db = require("./startup/db.js");
db();
router(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  logger.info(`Listening on Port ${port}...`);
});

module.exports = server;
