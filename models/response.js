const mongoose = require("mongoose");

// Define the response schema
const responseSchema = new mongoose.Schema({
  orderId: { type: String },
  price: { type: Number },
  content: { type: String },
});

// Create the Response model using the response schema
const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
