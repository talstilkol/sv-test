const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only (fixed, deterministic)
const items = [
  { id: 1, name: 'Alice', value: 100, salary: 5000, grade: true },
  { id: 2, name: 'Bob', value: 200, salary: 6000, grade: false },
  { id: 3, name: 'Charlie', value: 150, salary: 5500, grade: true }
];

router.post('/', express.json(), (req, res) => {
  const { name, value, salary, grade } = req.body;

  // Validation: name is required
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required and must be a non-empty string' });
  }

  // Create new item with deterministic id
  const newId = items.length + 1;
  const newItem = {
    id: newId,
    name: name.trim(),
    value: typeof value === 'number' ? value : 0,
    salary: typeof salary === 'number' ? salary : 0,
    grade: typeof grade === 'boolean' ? grade : false
  };

  items.push(newItem);

  res.status(201).json(newItem);
});

module.exports = router;