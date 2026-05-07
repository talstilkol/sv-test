const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only
const items = [
  { id: 1, name: 'Channel A', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Channel B', value: 200, salary: 6000, grade: 'B' },
  { id: 3, name: 'Channel C', value: 150, salary: 5500, grade: 'C' }
];

// Allowed fields for update
const allowedFields = ['name', 'value', 'salary', 'grade'];

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const body = req.body || {};

  // Validate id
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid id: must be a number' });
  }

  // Find item
  const itemIndex = items.findIndex(item => item.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  // Validate and apply updates
  const updates = {};
  for (const key in body) {
    if (allowedFields.includes(key)) {
      const value = body[key];
      // Basic type validation
      if (key === 'name' && typeof value !== 'string') {
        return res.status(400).json({ error: `Invalid type for 'name': expected string` });
      }
      if ((key === 'value' || key === 'salary') && typeof value !== 'number') {
        return res.status(400).json({ error: `Invalid type for '${key}': expected number` });
      }
      if (key === 'grade' && typeof value !== 'string') {
        return res.status(400).json({ error: `Invalid type for 'grade': expected string` });
      }
      updates[key] = value;
    } else {
      return res.status(400).json({ error: `Invalid field: ${key}` });
    }
  }

  // Apply updates
  Object.assign(items[itemIndex], updates);

  return res.status(200).json(items[itemIndex]);
});

module.exports = router;