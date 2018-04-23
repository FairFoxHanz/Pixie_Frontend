const keys = require("../config/keys");
const router = require("express").Router();
const mongoose = require("mongoose");
const { requireLogin } = require("../middlewares/require_login");
const User = mongoose.model("users");

router.get("/list", requireLogin, async (req, res) => {
  const users = await User.find({});

  res.status(200).send(users);
});

module.exports = router;
