const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only (not used in logic, just for reference)
const items = [
  { id: 1, name: 'Product A', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Product B', value: 200, salary: 6000, grade: 'B' }
];

// Middleware to parse JSON body
router.use(express.json());

// POST / - create new item
router.post('/', (req, res) => {
  const { name, value, salary, grade } = req.body;

  // Validation
  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'name must be a non-empty string' });
  }
  if (typeof value !== 'number' || typeof salary !== 'number') {
    return res.status(400).json({ error: 'value and salary must be numbers' });
  }
  if (typeof grade !== 'string' || !['A', 'B', 'C', 'D', 'E'].includes(grade)) {
    return res.status(400).json({ error: 'grade must be one of: A, B, C, D, E' });
  }

  // Create new item (deterministic: id = max existing id + 1)
  const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
  const newItem = {
    id: newId,
    name: name.trim(),
    value,
    salary,
    grade
  };

  // In real app we'd push to DB; here we just return it (no mutation of items array)
  res.status(201).json(newItem);
});

module.exports = router;