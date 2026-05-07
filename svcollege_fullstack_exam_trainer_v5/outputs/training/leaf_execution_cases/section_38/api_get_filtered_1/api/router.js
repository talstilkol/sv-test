const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only – fixed and deterministic
const items = [
  { id: 1, name: 'Alice', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Bob', value: 200, salary: 6000, grade: 'B' },
  { id: 3, name: 'Charlie', value: 150, salary: 5500, grade: 'A' },
  { id: 4, name: 'Diana', value: 300, salary: 7000, grade: 'C' },
  { id: 5, name: 'Eve', value: 120, salary: 4800, grade: 'B' }
];

// Normalize query parameter names to standard keys
function normalizeQuery(query) {
  const normalized = {};
  if (query.maxSalary !== undefined || query.max_salary !== undefined || query.salary !== undefined) {
    const val = query.maxSalary ?? query.max_salary ?? query.salary;
    normalized.maxSalary = Number(val);
  }
  if (query.value !== undefined) {
    normalized.value = Number(query.value);
  }
  if (query.threshold !== undefined) {
    normalized.threshold = Number(query.threshold);
  }
  return normalized;
}

// GET /filter – filter items by query params (maxSalary, value, threshold)
router.get('/filter', (req, res) => {
  const { maxSalary, value, threshold } = normalizeQuery(req.query);

  let filtered = [...items];

  if (typeof maxSalary === 'number' && !isNaN(maxSalary)) {
    filtered = filtered.filter(item => item.salary <= maxSalary);
  }

  if (typeof value === 'number' && !isNaN(value)) {
    filtered = filtered.filter(item => item.value >= value);
  }

  if (typeof threshold === 'number' && !isNaN(threshold)) {
    // threshold used as min value (same as 'value' param, but alternative name)
    filtered = filtered.filter(item => item.value >= threshold);
  }

  res.status(200).json(filtered);
});

module.exports = router;