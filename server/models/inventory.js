const mongoose = require("mongoose");
const { Schema } = mongoose;

const inventorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  }
});

mongoose.model("inventory", inventorySchema);
