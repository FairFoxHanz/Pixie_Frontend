const _ = require("lodash");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/require_login");
const router = require("express").Router();
const Invitation = mongoose.model("invitations");
const Inventory = mongoose.model("inventory");
const Event = mongoose.model("events");
const {
  parseInvitationIdsToInvitations
} = require("../parsers/InvitationsParser");

router.post("/respond", requireLogin, async (req, res) => {
  const { response, inventoryAccepted } = req.body;
});

router.post("/provide", requireLogin, async (req, res) => {
  try {
    const { eventId, item } = req.body;
    const userId = req.user.id;
    let alreadyBrings = false;
    let itemIndex = null;

    const invitation = await Invitation.findOne({
      eventId: eventId,
      invitedId: userId
    });

    let willBring = null;
    for (const [index, value] of invitation.inventoryAccepted.entries()) {
      if (value.name === item.name) {
        willBring = Number(value.amount) + Number(item.amount);
        itemIndex = index;
        alreadyBrings = true;
        break;
      }
    }

    if (alreadyBrings) {
      invitation.inventoryAccepted[itemIndex].amount = Number(willBring);
      invitation.inventoryAccepted.set(
        itemIndex,
        invitation.inventoryAccepted[itemIndex]
      );
    } else {
      invitation.inventoryAccepted.push(new Inventory(item));
    }

    await invitation.save();
    const event = await Event.findById(eventId);

    for (const [index, value] of event.inventory.entries()) {
      if (value.name === item.name) {
        itemIndex = index;
        break;
      }
    }

    event.inventory[itemIndex].amount -= Number(item.amount);
    event.inventory.set(itemIndex, event.inventory[itemIndex]);

    await event.save();

    res.status(200).send(event);
  } catch (error) {
    console.log(error);
    res.status(500).send({});
  }
});

router.post("/cancelItem", requireLogin, async (req, res) => {
  try {
    const { eventId, itemName } = req.body;
    const userId = req.user.id;
    let itemIndex = null;
    let willNotBring = null;

    const invitation = await Invitation.findOne({
      eventId: eventId,
      invitedId: userId
    });

    for (const [index, value] of invitation.inventoryAccepted.entries()) {
      if (value.name === itemName) {
        willNotBring = Number(value.amount);
        itemIndex = index;
        break;
      }
    }

    invitation.inventoryAccepted.splice(itemIndex, 1);

    await invitation.save();
    const event = await Event.findById(eventId);

    for (const [index, value] of event.inventory.entries()) {
      if (value.name === itemName) {
        itemIndex = index;
        break;
      }
    }

    event.inventory[itemIndex].amount += Number(willNotBring);
    event.inventory.set(itemIndex, event.inventory[itemIndex]);

    await event.save();

    res.status(200).send(event);
  } catch (error) {
    console.log(error);
    res.status(500).send({});
  }
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

router.post("/cancel", requireLogin, async (req, res) => {
  try {
    const invitationId = req.body.invitationId;
    const invitation = await Invitation.findOne({
      _id: invitationId
    });

    Invitation.findByIdAndRemove(invitationId, async (err, invitation) => {
      if (err) {
        res.status(500).send([]);
      }
      const event = await Event.findOne({ _id: invitation.eventId });

      for (const inventoryItem of invitation.inventoryAccepted) {
        for (const [index, value] of event.inventory.entries()) {
          if (value.name === inventoryItem.name) {
            itemIndex = index;
            break;
          }
        }

        event.inventory[itemIndex].amount += Number(inventoryItem.amount);
        event.inventory.set(itemIndex, event.inventory[itemIndex]);
      }

      event.invitations = event.invitations.filter(
        invitation => invitation !== invitationId
      );

      event.save();

      const invitationsId = event.invitations;
      const guestsList = await parseInvitationIdsToInvitations(invitationsId);

      res.status(200).send(guestsList);
    });
  } catch (error) {
    res.status(400).send([]);
  }
});

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
