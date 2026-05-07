const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Fixed test data
const items = [
  { id: 1, name: 'Computer', value: 3000, salary: 5000, grade: 'A' },
  { id: 2, name: 'Monitor', value: 1200, salary: 2000, grade: 'B' },
  { id: 3, name: 'Keyboard', value: 300, salary: 500, grade: 'C' }
];

// Middleware to parse JSON body
router.use(express.json());

// POST / - create new item
router.post('/', (req, res) => {
  const { name, value, salary, grade } = req.body;

  // Validation
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required and must be a non-empty string' });
  }
  if (value === undefined || typeof value !== 'number' || value < 0) {
    return res.status(400).json({ error: 'Value is required and must be a non-negative number' });
  }

  // Generate new ID
  const maxId = items.length > 0 ? Math.max(...items.map(i => i.id)) : 0;
  const newItem = {
    id: maxId + 1,
    name: name.trim(),
    value: value,
    salary: salary ?? 0,
    grade: grade ?? 'D'
  };

  // Add to items (in real app, save to DB)
  items.push(newItem);

  // Return created item
  res.status(201).json(newItem);
});

module.exports = router;