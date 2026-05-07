# Books Edit Textual Completeness Pack

For any answer about library edit flow, include all of these explicitly:

1. `GET /api/books/:id`
2. `Book.findById(req.params.id)`
3. `404` when book is missing
4. `500` with `err.message` on server error
5. `cors({ origin: 'http://localhost:3000' })`
6. React `"proxy": "http://localhost:5000"`
7. Borrow/Return consistency: do not render Return without route

Example required route:

```js
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
```
