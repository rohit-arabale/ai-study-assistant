const Subject = require("../models/Subject");

// Create subject
exports.createSubject = async (req, res) => {
  try {
    const subject = await Subject.create({
      name: req.body.name,
      user: req.user,
    });

    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all subjects
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ user: req.user });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};