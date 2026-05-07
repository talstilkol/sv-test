const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only
const items = [
  { id: 1, name: 'Item A', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Item B', value: 200, salary: 6000, grade: 'B' },
  { id: 3, name: 'Item C', value: 150, salary: 5500, grade: 'C' }
];

// Middleware to parse JSON bodies
router.use(express.json());

// POST / - create new item
router.post('/', (req, res) => {
  const { name, value, salary, grade } = req.body;

  // Validation: name and value are required
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required and must be a non-empty string' });
  }
  if (value === undefined || typeof value !== 'number') {
    return res.status(400).json({ error: 'Value is required and must be a number' });
  }

  const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
  const newItem = {
    id: newId,
    name: name.trim(),
    value,
    salary: salary ?? 0,
    grade: grade ?? 'D'
  };

  items.push(newItem);

  res.status(201).json(newItem);
});

module.exports = router;