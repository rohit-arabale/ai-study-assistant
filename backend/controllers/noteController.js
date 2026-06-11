const Note = require("../models/note");

// Create note
exports.createNote = async (req, res) => {
  try {
    const { title, content, subjectId } = req.body;

    if (!subjectId) {
      return res.status(400).json({ error: "Subject is required" });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({ error: "Note content is required" });
    }

    const note = await Note.create({
      title: title?.trim() || "Untitled Note",
      content: content.trim(),
      subject: subjectId,
      user: req.user,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all notes
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user,
    });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get notes by subject
exports.getNotesBySubject = async (req, res) => {
  try {
    const notes = await Note.find({
      subject: req.params.subjectId,
      user: req.user,
    }).sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete note
exports.deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
