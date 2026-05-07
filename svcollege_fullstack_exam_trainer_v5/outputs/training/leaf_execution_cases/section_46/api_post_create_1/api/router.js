const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only
let items = [
  { id: 1, name: 'Computer', value: 3000, salary: 5000, grade: 'A' },
  { id: 2, name: 'Mouse', value: 100, salary: 200, grade: 'B' },
  { id: 3, name: 'Keyboard', value: 200, salary: 300, grade: 'B' }
];

// Middleware to parse JSON body
router.use(express.json());

// POST / - create new item
router.post('/', (req, res) => {
  const { name, value, salary, grade } = req.body;

  // Validation: name is required
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required and must be a non-empty string' });
  }

  // Generate new ID (deterministic: max ID + 1)
  const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;

  const newItem = {
    id: newId,
    name: name.trim(),
    value: value ?? 0,
    salary: salary ?? 0,
    grade: grade ?? 'C'
  };

  items.push(newItem);

  res.status(201).json(newItem);
});

module.exports = router;