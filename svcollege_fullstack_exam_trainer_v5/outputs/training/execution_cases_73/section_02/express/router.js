const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Deterministic fixture data
const items = [
  { id: 1, name: 'Alice', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Bob', value: 200, salary: 4500, grade: 'B' },
  { id: 3, name: 'Charlie', value: 150, salary: 6000, grade: 'A' },
  { id: 4, name: 'Diana', value: 300, salary: 4000, grade: 'C' },
  { id: 5, name: 'Eve', value: 250, salary: 5500, grade: 'B' }
];

// POST /filter - return teachers with salary lower than provided value
router.post('/filter', (req, res) => {
  const { value } = req.body;
  
  if (value === undefined || typeof value !== 'number') {
    return res.status(400).json({ error: 'Invalid or missing value parameter' });
  }
  
  const filteredItems = items.filter(item => item.salary < value);
  res.json(filteredItems);
});

// POST / - create new item with validation and duplicate prevention
router.post('/', (req, res) => {
  const { id, name, value, salary, grade } = req.body;
  
  // Validation
  if (!id || !name || value === undefined || salary === undefined || !grade) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  if (typeof id !== 'number' || typeof name !== 'string' || typeof value !== 'number' || 
      typeof salary !== 'number' || typeof grade !== 'string') {
    return res.status(400).json({ error: 'Invalid field types' });
  }
  
  // Duplicate prevention
  const existingItem = items.find(item => item.id === id);
  if (existingItem) {
    return res.status(409).json({ error: 'Duplicate ID' });
  }
  
  // Create new item
  const newItem = {
    id,
    name,
    value,
    salary,
    grade
  };
  
  items.push(newItem);
  res.status(201).json(newItem);
});

module.exports = router;