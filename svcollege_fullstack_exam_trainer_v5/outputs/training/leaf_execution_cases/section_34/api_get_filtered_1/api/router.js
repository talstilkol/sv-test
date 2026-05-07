const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only - fixed and deterministic
const items = [
  { id: 1, name: 'Alice', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Bob', value: 200, salary: 6000, grade: 'B' },
  { id: 3, name: 'Charlie', value: 150, salary: 5500, grade: 'A' },
  { id: 4, name: 'Diana', value: 300, salary: 7000, grade: 'C' }
];

// GET /?maxSalary=6000 OR /?salary=5500 OR /?threshold=150 etc.
router.get('/', (req, res) => {
  const query = req.query;
  let filtered = [...items];

  // Check for any supported alias in query
  const salaryKey = ['maxSalary', 'max_salary', 'salary'].find(k => query[k] !== undefined);
  const valueKey = ['value', 'threshold'].find(k => query[k] !== undefined);

  if (salaryKey) {
    const maxSalary = Number(query[salaryKey]);
    if (!isNaN(maxSalary)) {
      filtered = filtered.filter(item => item.salary <= maxSalary);
    }
  }

  if (valueKey) {
    const threshold = Number(query[valueKey]);
    if (!isNaN(threshold)) {
      filtered = filtered.filter(item => item.value >= threshold);
    }
  }

  res.status(200).json(filtered);
});

// POST /filter with body: { maxSalary: 6000 } OR { value: 150 } etc.
router.post('/filter', (req, res) => {
  const body = req.body;
  let filtered = [...items];

  // Check for any supported alias in body
  const salaryKey = ['maxSalary', 'max_salary', 'salary'].find(k => body[k] !== undefined);
  const valueKey = ['value', 'threshold'].find(k => body[k] !== undefined);

  if (salaryKey) {
    const maxSalary = Number(body[salaryKey]);
    if (!isNaN(maxSalary)) {
      filtered = filtered.filter(item => item.salary <= maxSalary);
    }
  }

  if (valueKey) {
    const threshold = Number(body[valueKey]);
    if (!isNaN(threshold)) {
      filtered = filtered.filter(item => item.value >= threshold);
    }
  }

  res.status(200).json(filtered);
});

module.exports = router;