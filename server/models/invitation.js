const mongoose = require("mongoose");
const { Schema } = mongoose;
const inventorySchema = require("./inventory");

const invitationSchema = new Schema({
  invitedId: {
    type: String,
    required: true
  },
  eventId: {
    type: String,
    required: true
  },
  response: {
    type: Boolean
  },
  inventoryAsked: {
    type: [inventorySchema]
  },
  inventoryAccepted: {
    type: [inventorySchema]
  }
});

mongoose.model("invitations", invitationSchema);
