const mongoose = require("mongoose");
const { Schema } = mongoose;
const inventorySchema = require("./inventory");
const invitationSchema = require("./invitation");

const eventSchema = new Schema({
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
  invitations: [invitationSchema],
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("events", eventSchema);
