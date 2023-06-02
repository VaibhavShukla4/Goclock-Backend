const express = require("express");
const router = express.Router();
const messageController = require("../Controllers/messageController");

router.post("/manufacturer/message", messageController.sendMessage);
router.post("/transporter/response", messageController.sendResponse);
router.get("/messages", messageController.getMessages);

module.exports = router;
