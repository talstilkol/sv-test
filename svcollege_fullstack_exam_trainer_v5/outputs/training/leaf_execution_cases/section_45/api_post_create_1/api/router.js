const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only
const items = [
  { id: 1, name: 'Item A', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Item B', value: 200, salary: 6000, grade: 'B' }
];

// Middleware to parse JSON bodies
router.use(express.json());

// POST / - create new item
router.post('/', (req, res) => {
  const { name, value, salary, grade } = req.body;

  // Validation: all fields required and correct types
  if (
    typeof name !== 'string' || name.trim() === '' ||
    typeof value !== 'number' || value < 0 ||
    typeof salary !== 'number' || salary < 0 ||
    typeof grade !== 'string' || grade.trim() === ''
  ) {
    return res.status(400).json({ error: 'Invalid input: name (string), value (number ≥ 0), salary (number ≥ 0), grade (string) are required' });
  }

  const newItem = {
    id: items.length + 1,
    name: name.trim(),
    value,
    salary,
    grade: grade.trim()
  };

  items.push(newItem);

  res.status(201).json(newItem);
});

module.exports = router;