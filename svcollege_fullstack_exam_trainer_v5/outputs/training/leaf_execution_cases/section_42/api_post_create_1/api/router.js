const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only
let items = [
  { id: 1, name: 'Alice', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Bob', value: 200, salary: 6000, grade: 'B' }
];

// Middleware to parse JSON body
router.use(express.json());

// POST / - create new item
router.post('/', (req, res) => {
  const { name, value, salary, grade } = req.body;

  // Validation: all fields required
  if (!name || typeof name !== 'string' ||
      value === undefined || typeof value !== 'number' ||
      salary === undefined || typeof salary !== 'number' ||
      grade === undefined || typeof grade !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid fields: name (string), value (number), salary (number), grade (string)' });
  }

  // Generate new id
  const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;

  const newItem = {
    id: newId,
    name,
    value,
    salary,
    grade
  };

  items.push(newItem);

  res.status(201).json(newItem);
});

module.exports = router;