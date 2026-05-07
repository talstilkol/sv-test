const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only (fixed)
const items = [
  { id: 1, name: 'Alice', salary: 8000, grade: 'A', value: 100 },
  { id: 2, name: 'Bob', salary: 6000, grade: 'B', value: 80 },
  { id: 3, name: 'Carol', salary: 9000, grade: 'A', value: 120 }
];

// Middleware to parse JSON body
router.use(express.json());

// POST / - create new item
router.post('/', (req, res) => {
  const { name, salary, grade, value } = req.body;

  // Validation: name and salary are required
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required and must be a non-empty string' });
  }
  if (salary === undefined || salary === null || typeof salary !== 'number' || !isFinite(salary)) {
    return res.status(400).json({ error: 'Salary is required and must be a number' });
  }

  const newItem = {
    id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
    name: name.trim(),
    salary,
    grade: grade ?? 'C',
    value: value ?? 0
  };

  items.push(newItem);

  res.status(201).json(newItem);
});

module.exports = router;