const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data store for testing only (fixed, deterministic)
let items = [
  { id: 1, name: 'Math', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Physics', value: 90, salary: 4500, grade: 'B' }
];

// Middleware to parse JSON body
router.use(express.json());

// POST /add - create new course if not exists
router.post('/add', (req, res) => {
  const { name, value, salary, grade } = req.body;

  // Validation: all fields must be present and non-empty
  if (!name || typeof name !== 'string' ||
      value === undefined || typeof value !== 'number' ||
      salary === undefined || typeof salary !== 'number' ||
      grade === undefined || typeof grade !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid fields: name, value, salary, grade required' });
  }

  // Check if item with same name already exists
  const exists = items.some(item => item.name === name);
  if (exists) {
    return res.status(409).json({ error: 'Course already exists' });
  }

  // Create new item
  const newItem = {
    id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
    name,
    value,
    salary,
    grade
  };

  items.push(newItem);

  res.status(201).json({ message: 'Course added successfully', item: newItem });
});

module.exports = router;