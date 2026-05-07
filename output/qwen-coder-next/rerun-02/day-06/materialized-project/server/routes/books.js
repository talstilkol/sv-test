const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET /api/books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/books/:id - שליפת ספר בודד לצורך עריכה
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/books
router.post('/', async (req, res) => {
  try {
    const { title, author, year, genre } = req.body;
    // Frontend-side validations must mirror this (handled in frontend too)
    const book = new Book({ title, author, year, genre });
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/books/:id
router.put('/:id', async (req, res) => {
  try {
    const { title, author, year, genre, isAvailable } = req.body;
    const existingBook = await Book.findById(req.params.id);
    if (!existingBook) return res.status(404).json({ message: 'Book not found' });

    // Check duplicate title (excluding current book)
    const titleDuplicate = await Book.findOne({ _id: { $ne: req.params.id }, title });
    if (titleDuplicate) {
      return res.status(400).json({ message: 'Title already exists' });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, year, genre, isAvailable },
      { new: true }
    );
    res.json(updatedBook);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/books/:id
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    await book.remove();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/books/borrow/:id
router.post('/borrow/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (!book.isAvailable) return res.status(400).json({ message: 'Book is not available' });

    // borrower is not specified in requirements → hardcode empty string or require frontend to provide? 
    // Requirement says "borrow: allowed only when isAvailable is true"
    // → We'll set isAvailable = false, borrowedBy = '' (empty) since no borrower data given.
    book.isAvailable = false;
    book.borrowedBy = '';
    const updated = await book.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
