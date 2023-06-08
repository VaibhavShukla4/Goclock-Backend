const mongoose = require("mongoose");

// Define the message schema
const messageSchema = new mongoose.Schema({
  orderId: { type: String },
  to: { type: String },
  from: { type: String },
  quantity: { type: Number },
  address: { type: String },
  transporter: { type: String },
  content: { type: String },
});

// Create the Message model using the message schema
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
