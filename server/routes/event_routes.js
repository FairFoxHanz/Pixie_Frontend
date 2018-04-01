const mongoose = require("mongoose");
const requireLogin = require("../middlewares/require_login");
const router = require("express").Router();
const Event = mongoose.model("events");

router.get("/details", requireLogin, async (req, res) => {
  const event = await Event.find({ _id: req.query.eventId });

  res.send(event[0]);
});

router.get("/list", requireLogin, async (req, res) => {
  const events = await Event.find({ _user: req.user.id });

  res.send(events);
});

router.post("/create", requireLogin, async (req, res) => {
  const { name, place, date } = req.body;
  
  const event = new Event({
    name,
    place,
    eventDate: Date.parse(date),
    _user: req.user.id
  });
  
  try {
    await event.save();
    res.status(200).send(event);
  } catch (error) {
    res.status(422).send(error);
  }
});

module.exports = router;
