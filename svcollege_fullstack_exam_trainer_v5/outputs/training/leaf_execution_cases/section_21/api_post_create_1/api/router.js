const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data store for testing only (fixed, deterministic)
const items = [
  { id: 1, name: 'Alice', value: 85, salary: 5000 },
  { id: 2, name: 'Bob', value: 90, salary: 6000 }
];

router.post('/', express.json(), (req, res) => {
  const { id, name } = req.body;

  // Validation: must have id and name
  if (!id || !name) {
    return res.status(400).json({ error: 'Missing required fields: id and name' });
  }

  // Check if id already exists
  const exists = items.some(item => item.id === id);
  if (exists) {
    return res.status(400).json({ error: 'Student with this ID already exists' });
  }

  // Create new student (with fixed defaults for value/salary if missing)
  const newItem = {
    id: Number(id),
    name: String(name),
    value: req.body.value ?? 0,
    salary: req.body.salary ?? 0
  };

  items.push(newItem);

  return res.status(201).json({ message: 'Student created successfully', student: newItem });
});

module.exports = router;