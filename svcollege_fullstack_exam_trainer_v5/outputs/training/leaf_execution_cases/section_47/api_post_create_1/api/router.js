const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only - deterministic and fixed
const items = [
  { id: 1, name: 'קופסא אדומה', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'קופסא כחולה', value: 200, salary: 6000, grade: 'B' },
  { id: 3, name: 'קופסא ירוקה', value: 150, salary: 5500, grade: 'A' }
];

// Middleware to parse JSON body
router.use(express.json());

// POST / - create new item
router.post('/', (req, res) => {
  const { name, value, salary, grade } = req.body;

  // Validation: name and value are required
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'name is required and must be a non-empty string' });
  }
  if (value === undefined || typeof value !== 'number') {
    return res.status(400).json({ error: 'value is required and must be a number' });
  }

  // Generate new id deterministically
  const maxId = items.reduce((max, item) => Math.max(max, item.id), 0);
  const newId = maxId + 1;

  const newItem = {
    id: newId,
    name: name.trim(),
    value,
    salary: salary ?? 0,
    grade: grade ?? 'C'
  };

  items.push(newItem);

  res.status(201).json(newItem);
});

module.exports = router;