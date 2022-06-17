const router = require("express").Router();
const { User } = require("../models/user");

router.get("/", () => {
  const users = User.find({}).sort("name");
});
