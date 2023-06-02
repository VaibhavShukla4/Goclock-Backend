const MessageModel = require("../models/message");
const ResponseModel = require("../models/response");
const UserModel = require("../models/user");

// Manufacturer sends a message
exports.sendMessage = async (req, res) => {
  try {
    const { orderId, to, from, quantity, address, transporter } = req.body;

    const message = new MessageModel({
      orderId,
      to,
      from,
      quantity,
      address,
      transporter,
    });

    await message.save();

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while sending the message" });
  }
};

// Transporter sends a response
exports.sendResponse = async (req, res) => {
  try {
    const { orderId, price } = req.body;

    const response = new ResponseModel({
      orderId,
      price,
    });

    await response.save();

    res.status(200).json({ message: "Response sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while sending the response" });
  }
};

// Get all messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await MessageModel.find();
    res.status(200).json({ messages });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the messages" });
  }
};
