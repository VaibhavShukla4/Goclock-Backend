const express = require("express");
const router = express.Router();
const messageController = require("../Controllers/messageController");

router.post("/manufacturer/send", messageController.sendMessage);
router.post("/transporter/response", messageController.sendResponse);
router.post("/signup", messageController.registerUser);
router.post("/loginUser", messageController.loginUser);
router.get("/messages", messageController.getMessages);

module.exports = router;
