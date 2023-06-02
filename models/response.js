const mongoose = require("mongoose");

// Define the response schema
const responseSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  price: { type: Number, required: true },
});

// Create the Response model using the response schema
const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
