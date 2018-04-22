const mongoose = require("mongoose");
const requireLogin = require("../middlewares/require_login");
const router = require("express").Router();
const Invitation = mongoose.model("invitations");
const Inventory = mongoose.model("inventory");
const Event = mongoose.model("events");
const {parseInvitationIdsToInvitations} = require("../parsers/InvitationsParser");

router.post("/respond", requireLogin, async (req, res) => {
  const { response, inventoryAccepted } = req.body;
});

router.post("/modify", requireLogin, async (req, res) => {
  //   const event = await Event.find({ _id: req.query.eventId });
  //   res.send(event[0]);
});

router.post("/invite", requireLogin, async (req, res) => {
  const eventId = req.body.eventId;
  const rawInvitations = req.body.invitations;
  try {
    const event = await Event.findOne({ _id: eventId });

    const invitations = await Promise.all(
      rawInvitations.map(async invitation =>
        createInvitations(invitation, eventId)
      )
    );
    const filteredInvitations = await Promise.all(
      invitations.filter(invitation => {
        return invitation != null;
      })
    );

    event.invitations.push(...filteredInvitations);
    await event.save();
    const guestsList = await parseInvitationIdsToInvitations(event.invitations);

    res.status(200).send(guestsList);
  } catch (error) {
    res.status(422).send(error);
  }
});

async function createInvitations({ invitedId, inventoryAsked }, eventId) {
  let invitation = await Invitation.findOne({
    invitedId: invitedId,
    eventId: eventId
  });

  invitation = invitation === {} ? null : invitation;

  if (!invitation) {
    if (inventoryAsked) {
      inventoryAsked = inventoryAsked.map(
        ({ name, amount, units }) => new Inventory({ name, amount, units })
      );
      invitation = new Invitation({ invitedId, eventId, inventoryAsked });
      invitation.save();
      return invitation._id;
    } else {
      invitation = new Invitation({ invitedId, eventId });
      invitation.save();
      return invitation._id;
    }
  } else {
    return null;
  }
}

router.get("/list", requireLogin, async (req, res) => {
  try {
    const invitations = await Invitation.find({ invitedId: req.user.id });
    const invitationsWithDetails = await Promise.all(
      invitations.map(async invitation => {
        const detailedInvitation = { invitation };
        const event = await Event.findOne({ _id: invitation.eventId });
        detailedInvitation.eventName = event.name;
        detailedInvitation.eventPlace = event.place;
        detailedInvitation.eventDate = event.eventDate;
        return detailedInvitation;
      })
    );
    res.status(200).send(invitationsWithDetails);
  } catch (error) {
    res.status(422).send(error);
  }
});

module.exports = router;
