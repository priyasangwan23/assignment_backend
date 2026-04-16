const Note = require("../models/note.model");

exports.createNote = async (req, res) => {
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
    message: "Note created",
    data: note
  });
};

exports.bulkCreate = async (req, res) => {
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
    message: "Bulk notes created",
    data: result
  });
};

exports.getAllNotes = async (req, res) => {
  const notes = await Note.find();

  res.json({
    success: true,
    message: "Notes fetched",
    data: notes
  });
};

exports.getNoteById = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Not found",
      data: null
    });
  }

  res.json({
    success: true,
    message: "Note fetched",
    data: note
  });
};