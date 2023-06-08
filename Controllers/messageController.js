const MessageModel = require("../models/message");
const ResponseModel = require("../models/response");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    const { orderId, price, content } = req.body;
    console.log(req.body);
    const response = new ResponseModel({
      orderId,
      price,
      content,
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

// Get all response
exports.getResponse = async (req, res) => {
  try {
    const response = await ResponseModel.find();
    res.status(200).json({ response });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the response" });
  }
};
exports.registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    // console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "email already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const user = new User({
      email,
      password: hashedPassword,
      role,
    });
    // Save the user to the database
    await user.save();
    // console.log(result);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create and sign the JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key");

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
