const express = require('express');
const router = express.Router();
const Book = require('./Book');

// GET / - list all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /:id - get book by ID, 404 if not found
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /borrow/:id - borrow a book (set isAvailable = false), 400 if not available
router.post('/borrow/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    if (!book.isAvailable) {
      return res.status(400).json({ message: 'Book is not available for borrowing' });
    }
    book.isAvailable = false;
    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;