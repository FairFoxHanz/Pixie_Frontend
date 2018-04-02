const mongoose = require("mongoose");
const { Schema } = mongoose;

const inventorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  }
});

mongoose.model("inventory", inventorySchema);
