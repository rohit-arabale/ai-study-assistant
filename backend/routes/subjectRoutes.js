const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  createSubject,
  getSubjects,
} = require("../controllers/subjectController");

// Create subject
router.post("/", auth, createSubject);

// Get subjects
router.get("/", auth, getSubjects);

module.exports = router;