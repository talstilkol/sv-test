const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Deterministic fixture data for evaluation
const items = [
  { id: 1, name: 'Alice', value: 'Mathematics', salary: 12000, grade: 'A' },
  { id: 2, name: 'Bob', value: 'Physics', salary: 11000, grade: 'B' }
];

// POST / - Create a new teacher (instructor)
router.post('/', (req, res) => {
  try {
    const { name, value, salary, grade } = req.body;

    // Validation
    if (!name || !value) {
      return res.status(400).json({ error: 'Name and subject (value) are required' });
    }

    if (typeof salary !== 'number' || salary < 0) {
      return res.status(400).json({ error: 'Salary must be a non-negative number' });
    }

    if (!grade || typeof grade !== 'string') {
      return res.status(400).json({ error: 'Grade must be a non-empty string' });
    }

    // Check for duplicate (same name and subject)
    const duplicate = items.find(item => item.name === name && item.value === value);
    if (duplicate) {
      return res.status(409).json({ error: 'Teacher with same name and subject already exists' });
    }

    // Create new item
    const newItem = {
      id: items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1,
      name,
      value,
      salary,
      grade
    };

    // Simulate DB persistence
    items.push(newItem);

    // Return success response
    res.status(201).json({ message: 'Teacher registered successfully', data: newItem });
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

module.exports = router;