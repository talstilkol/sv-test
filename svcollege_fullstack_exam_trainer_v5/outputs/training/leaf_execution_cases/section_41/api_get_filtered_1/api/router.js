const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only
const items = [
  { id: 1, name: 'Alice', value: 100, salary: 4500, grade: 'A' },
  { id: 2, name: 'Bob', value: 200, salary: 5500, grade: 'B' },
  { id: 3, name: 'Charlie', value: 150, salary: 5000, grade: 'A' },
  { id: 4, name: 'Diana', value: 300, salary: 6000, grade: 'C' }
];

// GET /filter - filter items by query params (supports aliases)
router.get('/filter', (req, res) => {
  const { maxSalary, max_salary, salary, value, threshold, name } = req.query;

  let filtered = [...items];

  // Handle salary filtering (aliases: maxSalary, max_salary, salary, threshold)
  const salaryParam = maxSalary || max_salary || salary || threshold;
  if (salaryParam !== undefined) {
    const max = Number(salaryParam);
    if (!isNaN(max)) {
      filtered = filtered.filter(item => item.salary <= max);
    }
  }

  // Handle name filtering (exact match)
  if (name !== undefined) {
    filtered = filtered.filter(item => item.name === name);
  }

  res.status(200).json(filtered);
});

module.exports = router;