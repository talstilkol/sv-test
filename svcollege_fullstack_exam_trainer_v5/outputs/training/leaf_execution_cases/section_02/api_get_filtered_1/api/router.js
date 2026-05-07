const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only
const items = [
  { id: 1, name: 'Alice', value: 100, salary: 4500, grade: 'A' },
  { id: 2, name: 'Bob', value: 200, salary: 5200, grade: 'B' },
  { id: 3, name: 'Carol', value: 150, salary: 4800, grade: 'A' },
  { id: 4, name: 'David', value: 300, salary: 6000, grade: 'C' }
];

// POST /filter - return teachers with salary < threshold
router.post('/filter', (req, res) => {
  // Extract threshold from body or query, supporting multiple alias names
  const threshold =
    req.body?.maxSalary ??
    req.body?.max_salary ??
    req.body?.salary ??
    req.body?.value ??
    req.body?.threshold ??
    req.query?.maxSalary ??
    req.query?.max_salary ??
    req.query?.salary ??
    req.query?.value ??
    req.query?.threshold;

  // Validate: must be a finite number
  const numThreshold = Number(threshold);
  if (Number.isNaN(numThreshold) || !Number.isFinite(numThreshold)) {
    return res.status(400).json({ error: 'Invalid or missing threshold value' });
  }

  // Filter items where salary < threshold
  const filtered = items.filter(item => item.salary < numThreshold);

  res.status(200).json(filtered);
});

module.exports = router;