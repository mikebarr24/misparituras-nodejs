const parts = require("../routes/parts.js");
const express = require("express");

module.exports = (app) => {
  app.use(express.json());
  app.use("/api/parts", parts);
};
