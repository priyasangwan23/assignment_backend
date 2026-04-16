const Note = require("../models/note.model");
const mongoose = require("mongoose");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// CREATE
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content required",
        data: null
      });
    }

    const note = await Note.create(req.body);

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note
    });
  } catch {
    res.status(500).json({ success: false, message: "Server error", data: null });
  }
};

// BULK CREATE
exports.bulkCreate = async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes || notes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Notes array required",
        data: null
      });
    }

    const result = await Note.insertMany(notes);

    res.status(201).json({
      success: true,
      message: `${result.length} notes created successfully`,
      data: result
    });
  } catch {
    res.status(500).json({ success: false, message: "Server error", data: null });
  }
};

// GET ALL
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: notes
    });
  } catch {
    res.status(500).json({ success: false, message: "Server error", data: null });
  }
};

// GET BY ID
exports.getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
        data: null
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: "Note fetched successfully",
      data: note
    });
  } catch {
    res.status(500).json({ success: false, message: "Server error", data: null });
  }
};

// PUT (REPLACE)
exports.replaceNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
        data: null
      });
    }

    const note = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      overwrite: true,
      runValidators: true
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: "Note replaced successfully",
      data: note
    });
  } catch {
    res.status(500).json({ success: false, message: "Server error", data: null });
  }
};

// PATCH
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
        data: null
      });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update",
        data: null
      });
    }

    const note = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: note
    });
  } catch {
    res.status(500).json({ success: false, message: "Server error", data: null });
  }
};

// DELETE ONE
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
        data: null
      });
    }

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: null
    });
  } catch {
    res.status(500).json({ success: false, message: "Server error", data: null });
  }
};

// BULK DELETE
exports.bulkDelete = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "IDs array required",
        data: null
      });
    }

    const result = await Note.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} notes deleted successfully`,
      data: null
    });
  } catch {
    res.status(500).json({ success: false, message: "Server error", data: null });
  }
};