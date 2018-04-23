const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
const Invitation = mongoose.model("invitations");
const Inventory = mongoose.model("inventory");
const Event = mongoose.model("events");
const User = mongoose.model("users");

const parseInvitationIdsToInvitations = async invitationsIds => {
  return await Promise.all(
    invitationsIds.map(async invitationId => {
      const guest = {};
      const invitation = await Invitation.findOne({ _id: invitationId });
      const user = await User.findOne({
        _id: new ObjectID(invitation.invitedId)
      });
      guest.invitationId = invitationId;
      guest.name = user.name;
      guest.id = user._id;
      guest.inventoryAsked = invitation.inventoryAsked;
      guest.inventoryAccepted = invitation.inventoryAccepted;

      return guest;
    })
  );
};

module.exports = { parseInvitationIdsToInvitations };
