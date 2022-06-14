const express = require("express");
const router = express.Router();
const { Part } = require("../models/part");

router.get("/", async (req, res) => {
  const parts = await Part.find();
  res.send(parts);
});

module.exports = router;
