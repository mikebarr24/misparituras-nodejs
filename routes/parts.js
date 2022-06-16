const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { Part } = require("../models/part");

router.get("/", async (req, res) => {
  const parts = await Part.find();
  res.send(parts);
});

router.post("/", auth, async (req, res) => {
  if (req.user.isStaff === false) {
    return res.status(403).send("Not Authorised to complete this action");
  }
  const part = new Part(req.body);
  await part.save();
  res.send(part);
});

module.exports = router;
