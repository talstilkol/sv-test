const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only – deterministic
const items = [
  { id: 66698, name: 'קופסא כחולה', value: 120, salary: 4500, grade: 'B' },
  { id: 12345, name: 'מגש זהב', value: 300, salary: 6000, grade: 'A' },
  { id: 98765, name: 'כוס נייר', value: 5, salary: 1200, grade: 'C' },
  { id: 55555, name: 'עט מטלאי', value: 20, salary: 2500, grade: 'B' }
];

// GET /filter?maxSalary=5000 OR POST /filter with body { maxSalary: 5000 }
router.get('/filter', (req, res) => {
  const maxSalary = req.query.maxSalary ?? req.query.max_salary ?? req.query.salary ?? req.query.value ?? req.query.threshold;
  const maxVal = parseFloat(maxSalary);

  if (isNaN(maxVal)) {
    return res.status(400).json({ error: 'Invalid maxSalary parameter' });
  }

  const filtered = items.filter(item => item.salary <= maxVal);
  res.status(200).json(filtered);
});

router.post('/filter', (req, res) => {
  const { maxSalary, max_salary, salary, value, threshold } = req.body;
  const maxVal = parseFloat(maxSalary ?? max_salary ?? salary ?? value ?? threshold);

  if (isNaN(maxVal)) {
    return res.status(400).json({ error: 'Invalid maxSalary in body' });
  }

  const filtered = items.filter(item => item.salary <= maxVal);
  res.status(200).json(filtered);
});

module.exports = router;