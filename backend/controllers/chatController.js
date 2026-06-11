const Note = require("../models/note");
const { askAI } = require("../services/aiService");

exports.chatWithNote = async (req, res) => {
  try {
    const { noteId, question } = req.body;

    if (!noteId || !question || !question.trim()) {
      return res.status(400).json({ message: "Note and question are required" });
    }

    const note = await Note.findOne({
      _id: noteId,
      user: req.user,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const answer = await askAI(
      "You are a helpful AI study tutor. Use the note content as the primary context, but do not repeat the same fallback sentence. If the note is short or incomplete, still answer the student's question clearly in a natural teaching style using your general knowledge. Keep answers simple, direct, and useful. When relevant, connect the explanation back to the note. Avoid saying 'the note does not contain information' unless the user explicitly asks for a note-only answer.",
      `Note title: ${note.title || "Untitled Note"}\n\nNote content:\n${note.content}\n\nStudent question:\n${question.trim()}`
    );

    res.json({ answer });
  } catch (error) {
    console.error("Chat with note failed:", error.message);
    res.status(500).json({ message: error.message });
  }
};
