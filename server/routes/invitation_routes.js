const mongoose = require("mongoose");
const requireLogin = require("../middlewares/require_login");
const router = require("express").Router();
const Invitation = mongoose.model("invitations");

router.post("/respond", requireLogin, async (req, res) => {
//   const event = await Event.find({ _id: req.query.eventId });

//   res.send(event[0]);
});

router.post("/modify", requireLogin, async (req, res) => {
    //   const event = await Event.find({ _id: req.query.eventId });
    
    //   res.send(event[0]);
    });
    // invitedId: {
    //     type: String,
    //     required: true
    //   },
    //   eventId: {
    //     type: String,
    //     required: true
    //   },
    //   response: {
    //     type: Boolean
    //   },
    //   inventoryAsked
router.post("/invite", requireLogin, async (req, res) => {
    const rawInvitations = req.body;
  
    const invitations = rawInvitations.map(({invitedId, eventId, inventoryAsked}) => {
        return new Invitation({invitedId, eventId, inventoryAsked});
    })

    console.log(invitations);
//   const event = new Event({
//     name,
//     place,
//     eventDate: Date.parse(date),
//     inventory,
//     _user: req.user.id
//   });
  
  try {
    // await event.save();
    res.status(200).send({invitations});
  } catch (error) {
    res.status(422).send(error);
  }
});

router.get("/list", requireLogin, async (req, res) => {
    const invitations = await Invitation.find({ invitedId: req.user.id });

    res.send(invitations);
});

module.exports = router;
