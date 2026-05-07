# SVCollege Full-Stack Library Edit Flow Corrections

## Critical backend fix

Add this route in `routes/books.js` for edit-page data loading:

```js
// GET /api/books/:id - fetch single book for edit page
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

## Borrow / Return consistency

- If UI has `Borrow` button, backend must expose a matching borrow route.
- Do not render `Return` button without a real `return` route and implementation.
- Borrow is allowed only when `isAvailable === true`.

## Deployment alignment

- Backend CORS should explicitly allow the frontend local origin, typically `http://localhost:3000`.
- React app should set `"proxy": "http://localhost:5000"` for local API calls.
- MongoDB connection must be valid for local or Atlas environment.
