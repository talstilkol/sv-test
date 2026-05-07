const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only (fixed)
const items = [
  { id: 1, name: 'Alice', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Bob', value: 200, salary: 6000, grade: 'B' }
];

// Middleware to parse JSON body
router.use(express.json());

// POST / - create new item
router.post('/', (req, res) => {
  const { name, value, salary, grade } = req.body;

  // Validation: name must be a non-empty string
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required and must be a non-empty string' });
  }

  const newItem = {
    id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
    name: name.trim(),
    value: typeof value === 'number' ? value : 0,
    salary: typeof salary === 'number' ? salary : 0,
    grade: typeof grade === 'string' ? grade : 'U'
  };

  items.push(newItem);

  res.status(201).json(newItem);
});

module.exports = router;