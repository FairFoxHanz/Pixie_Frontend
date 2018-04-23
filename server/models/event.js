const mongoose = require("mongoose");
const { Schema } = mongoose;
const inventorySchema = require("./inventory");
const invitationSchema = require("./invitation");

const Event = new Schema({
  name: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  inventory: [inventorySchema],
  invitations: [String],
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("events", Event);
module.exports = { Event };
