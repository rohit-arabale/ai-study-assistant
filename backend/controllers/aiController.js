const { askAI } = require("../services/aiService");

exports.summarize = async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes) {
      return res.status(400).json({ error: "Notes are required" });
    }

    const result = await askAI(
      "You are a study assistant. Summarize the notes into clear, short bullet points for quick revision.",
      notes
    );

    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.explain = async (req, res) => {
  try {
    const { topic, notes } = req.body;

    if (!topic || !notes) {
      return res.status(400).json({ error: "Topic and notes are required" });
    }

    const result = await askAI(
      "You are a friendly teacher. Explain the topic in very simple words with examples so a beginner can understand.",
      `Topic: ${topic}\n\nNotes:\n${notes}`
    );

    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.generateQuiz = async (req, res) => {
  try {
    const { notes, quantity = 5 } = req.body;

    if (!notes) {
      return res.status(400).json({ error: "Notes are required" });
    }

    if (quantity && (quantity < 1 || quantity > 20)) {
      return res.status(400).json({ error: "Quantity must be between 1 and 20" });
    }

    const result = await askAI(
      `Generate ${quantity} multiple-choice questions with 4 options each and clearly mention the correct answer.`,
      notes
    );

    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.generateFlashcards = async (req, res) => {
  try {
    const { notes, quantity = 5 } = req.body;

    if (!notes) {
      return res.status(400).json({ error: "Notes are required" });
    }

    if (quantity && (quantity < 1 || quantity > 20)) {
      return res.status(400).json({ error: "Quantity must be between 1 and 20" });
    }

    const result = await askAI(
      `Create ${quantity} flashcards in this format:\nFRONT: Question\nBACK: Answer\n---`,
      notes
    );

    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.chat = async (req, res) => {
  try {
    const { question, notes } = req.body;

    if (!question || !notes) {
      return res.status(400).json({ error: "Question and notes are required" });
    }

    const result = await askAI(
      "You are a helpful tutor. Answer only using the provided notes. If the answer is not in the notes, say 'Not found in notes'.",
      `Notes:\n${notes}\n\nQuestion:\n${question}`
    );

    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
