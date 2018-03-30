const mongoose = require("mongoose");
const requireLogin = require("../middlewares/require_login");

const Event = mongoose.model("events");

module.exports = app => {
  app.get("/events/list", requireLogin, async (req, res) => {
    const events = await Event.find({ _user: req.user.id });

    res.send(events);
  });

  app.post("/events/create", requireLogin, async (req, res) => {
    const { name, place, date } = req.body;
    console.log(name, place, date);
    const event = new Event({
      name,
      place,
      eventDate:Date.parse(date),
      _user: req.user.id
    });
    console.log(event);
    try {
      await event.save();
      res.status(200).send(event);
    } catch (error) {
      res.status(422).send(error);
    }
  });
};
