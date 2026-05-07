const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data store for testing only
let items = [
  { id: 1, name: 'Alice', subject: 'Math', value: 90, salary: 12000 },
  { id: 2, name: 'Bob', subject: 'Physics', value: 85, salary: 11000 }
];

// Middleware to parse JSON body
router.use(express.json());

// POST / - create a new teacher if not exists
router.post('/', (req, res) => {
  const { name, subject } = req.body;

  // Validate required fields
  if (!name || !subject) {
    return res.status(400).json({ error: 'Missing required fields: name and subject are required' });
  }

  // Check if teacher already exists
  const existing = items.find(item => item.name === name && item.subject === subject);
  if (existing) {
    return res.status(409).json({ message: 'Teacher already exists' });
  }

  // Create new teacher
  const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
  const newItem = {
    id: newId,
    name,
    subject,
    value: req.body.value ?? 0,
    salary: req.body.salary ?? 0
  };
  items.push(newItem);

  return res.status(201).json({ message: 'Teacher added successfully', teacher: newItem });
});

module.exports = router;