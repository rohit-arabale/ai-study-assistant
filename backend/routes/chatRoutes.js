const express = require("express");
const router = express.Router();
const { chatWithNote } = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, chatWithNote);

module.exports = router;