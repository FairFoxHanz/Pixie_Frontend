const mongoose = require("mongoose");
const requireLogin = require("../middlewares/require_login");
const router = require("express").Router();
const { ObjectID } = require("mongodb");
const Event = mongoose.model("events");
const Invitation = mongoose.model("invitations");
const User = mongoose.model("users");

router.get("/details", requireLogin, async (req, res) => {
  const event = await Event.find({ _id: req.query.eventId });

  res.send(event[0]);
});

router.get("/list", requireLogin, async (req, res) => {
  const events = await Event.find({ _user: req.user.id });

  res.send(events);
});

router.get("/guests", requireLogin, async (req, res) => {
  try {
    const invitations = await Invitation.find({ eventId: req.query.eventId });
    const guestsList = await Promise.all(
      invitations.map(async invitation => {
        const guest = {};
        const user = await User.findOne({
          _id: new ObjectID(invitation.invitedId)
        });
        guest.name = user.name;
        guest.id = user._id;
        guest.inventoryAsked = invitation.inventoryAsked;
        guest.inventoryAccepted = invitation.inventoryAccepted;
        return guest;
      })
    );

    res.status(202).send(guestsList);
  } catch (error) {
    res.status(422).send(error);
  }
});

router.post("/create", requireLogin, async (req, res) => {
  const { name, place, date, inventory } = req.body;

  const event = new Event({
    name,
    place,
    eventDate: Date.parse(date),
    inventory,
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
