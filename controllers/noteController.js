const User = require("../models/User");
const Note = require("../models/Note");

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

/**
 * @desc    GET all notes
 * @route   GET /notes
 * @access  Private
 */
const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find().lean();
    if (!notes?.length) {
        return res.status(400).json({ message: "No notes found!" });
    }

    // Add username to each note before sending the response
    // That's because the concept of concurrency
    const notesWithUser = await Promise.all(
        notes.map(async (note) => {
            const user = await User.findById(note.user).lean().exec();
            return { ...note, username: user.username };
        })
    );

    res.json(notesWithUser);
});

/**
 * @desc    CREATE new note
 * @route   POST /notes
 * @access  Private
 */
const createNewNote = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body;

    // Confirm data
    if (!user || !title || !text) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    // Check for duplicate note
    const duplicate = await Note.findOne({ title }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: "Duplicate note title" });
    }

    // Create and store the new user
    const note = await Note.create({ user, title, text });

    if (note) {
        return res.status(201).json({ message: "New note created!" });
    } else {
        return res.status(400).json({ message: "Invalid note data received!" });
    }
});

/**
 * @desc    UPDATE a note
 * @route   PATCH /notes
 * @access  Private
 */
const updateNote = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body;

    // Confirm data
    if(!id || !user || !title || !text || typeof completed !== 'boolean'){
        res.status(400).json({ message: "All fields are required!" });
    }
});
