const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only - fixed and deterministic
const items = [
  { id: 1, name: 'Alice', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Bob', value: 200, salary: 6000, grade: 'B' },
  { id: 3, name: 'Charlie', value: 150, salary: 5500, grade: 'A' },
  { id: 4, name: 'Diana', value: 300, salary: 7000, grade: 'C' }
];

// GET /filter?maxSalary=5500&threshold=150
// POST /filter with body: { maxSalary: 5500, threshold: 150 }
router.get('/filter', (req, res) => {
  const { maxSalary, max_salary, salary, value, threshold } = req.query;

  const maxSalaryVal = Number(maxSalary || max_salary || salary || Infinity);
  const thresholdVal = Number(value || threshold || -Infinity);

  const filtered = items.filter(item => {
    const salaryOk = item.salary <= maxSalaryVal;
    const valueOk = item.value >= thresholdVal;
    return salaryOk && valueOk;
  });

  res.status(200).json(filtered);
});

router.post('/filter', (req, res) => {
  const { maxSalary, max_salary, salary, value, threshold } = req.body;

  const maxSalaryVal = Number(maxSalary || max_salary || salary || Infinity);
  const thresholdVal = Number(value || threshold || -Infinity);

  const filtered = items.filter(item => {
    const salaryOk = item.salary <= maxSalaryVal;
    const valueOk = item.value >= thresholdVal;
    return salaryOk && valueOk;
  });

  res.status(200).json(filtered);
});

module.exports = router;