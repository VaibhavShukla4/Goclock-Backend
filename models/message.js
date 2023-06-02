const mongoose = require("mongoose");

// Define the message schema
const messageSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  to: { type: String, required: true },
  from: { type: String, required: true },
  quantity: { type: Number, required: true },
  address: { type: String, required: true },
  transporter: { type: String, required: true },
});

// Create the Message model using the message schema
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
