const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only
const items = [
  { id: 1, name: 'Alice', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Bob', value: 200, salary: 6000, grade: 'B' },
  { id: 3, name: 'Charlie', value: 150, salary: 5500, grade: 'A' }
];

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  // Validation: id must be a positive integer
  if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid id: must be a positive integer' });
  }

  // Find index of item with matching id
  const index = items.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  // Remove item from array
  const deletedItem = items.splice(index, 1)[0];

  return res.status(200).json(deletedItem);
});

module.exports = router;