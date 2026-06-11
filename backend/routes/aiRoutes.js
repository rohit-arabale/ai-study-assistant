const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  summarize,
  explain,
  generateQuiz,
  generateFlashcards,
  chat,
} = require("../controllers/aiController");

router.post("/summarize", auth, summarize);
router.post("/explain", auth, explain);
router.post("/quiz", auth, generateQuiz);
router.post("/flashcards", auth, generateFlashcards);
router.post("/chat", auth, chat);

module.exports = router;