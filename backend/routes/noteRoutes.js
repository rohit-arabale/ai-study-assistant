const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const { createNote, getNotes, deleteNote, getNotesBySubject } = require("../controllers/noteController");

router.post("/", auth, createNote);
router.get("/:subjectId", auth, getNotesBySubject);
router.delete("/:id", auth, deleteNote);


module.exports = router;