const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Note || mongoose.model("Note", noteSchema);
