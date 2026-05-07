const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only – deterministic and fixed
const items = [
  { id: 1, name: 'JavaScript Basics', value: 100, salary: 4000, grade: 'A' },
  { id: 2, name: 'Python Advanced', value: 200, salary: 6000, grade: 'B' },
  { id: 3, name: 'Web Development', value: 150, salary: 5000, grade: 'A' },
  { id: 4, name: 'Data Science', value: 300, salary: 7000, grade: 'A' },
  { id: 5, name: 'DevOps', value: 250, salary: 5500, grade: 'B' }
];

// GET /?maxSalary=5000 (or aliases: max_salary, salary, value, threshold)
router.get('/', (req, res) => {
  const { maxSalary, max_salary, salary, value, threshold } = req.query;
  const thresholdValue = Number(maxSalary || max_salary || salary || value || threshold);

  if (isNaN(thresholdValue)) {
    return res.status(400).json({ error: 'Invalid or missing threshold parameter' });
  }

  const filtered = items
    .filter(item => item.salary >= thresholdValue)
    .sort((a, b) => a.name.localeCompare(b.name));

  res.status(200).json(filtered);
});

// POST /filter with body: { maxSalary: 5000 } (same aliases)
router.post('/filter', (req, res) => {
  const { maxSalary, max_salary, salary, value, threshold } = req.body;
  const thresholdValue = Number(maxSalary || max_salary || salary || value || threshold);

  if (isNaN(thresholdValue)) {
    return res.status(400).json({ error: 'Invalid or missing threshold in body' });
  }

  const filtered = items
    .filter(item => item.salary >= thresholdValue)
    .sort((a, b) => a.name.localeCompare(b.name));

  res.status(200).json(filtered);
});

module.exports = router;