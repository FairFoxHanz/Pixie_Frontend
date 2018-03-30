const mongoose = require("mongoose");
const { Schema } = mongoose;

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
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("events", eventSchema);
