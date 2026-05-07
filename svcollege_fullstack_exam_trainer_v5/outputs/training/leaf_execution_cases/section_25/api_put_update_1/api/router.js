const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data store for testing only (fixed)
const items = [
  { id: 1, name: 'Alice', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Bob', value: 200, salary: 6000, grade: 'B' },
  { id: 3, name: 'Charlie', value: 300, salary: 7000, grade: 'C' }
];

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const body = req.body;

  // Validation: id must be a number and body must be an object
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid id: must be a number' });
  }
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return res.status(400).json({ error: 'Request body must be a non-null object' });
  }

  // Find item by id
  const itemIndex = items.findIndex(item => item.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  // Update only provided fields (shallow merge)
  const updatedItem = { ...items[itemIndex], ...body };

  // Ensure id remains unchanged
  updatedItem.id = id;

  // Replace in array
  items[itemIndex] = updatedItem;

  return res.status(200).json(updatedItem);
});

module.exports = router;