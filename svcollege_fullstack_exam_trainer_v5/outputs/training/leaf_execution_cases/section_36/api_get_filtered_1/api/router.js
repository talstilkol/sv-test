const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only
const items = [
  { id: 1, name: 'Alice', value: 120, salary: 4500, grade: 'A' },
  { id: 2, name: 'Bob', value: 80, salary: 3500, grade: 'B' },
  { id: 3, name: 'Charlie', value: 150, salary: 6000, grade: 'A' },
  { id: 4, name: 'Diana', value: 90, salary: 4000, grade: 'C' }
];

// Helper: normalize key names to standard ones
function normalizeQuery(query) {
  const normalized = {};
  const aliases = {
    maxSalary: 'maxSalary',
    max_salary: 'maxSalary',
    salary: 'salary',
    value: 'value',
    threshold: 'value' // threshold is treated as value
  };

  for (const key in query) {
    const standardKey = aliases[key] || key;
    if (standardKey === 'maxSalary') {
      normalized.maxSalary = parseFloat(query[key]);
    } else if (standardKey === 'salary') {
      normalized.salary = parseFloat(query[key]);
    } else if (standardKey === 'value') {
      normalized.value = parseFloat(query[key]);
    }
  }

  return normalized;
}

// GET /filter - via query
router.get('/filter', (req, res) => {
  const params = normalizeQuery(req.query);
  const filtered = items.filter(item => {
    if (params.maxSalary !== undefined && item.salary > params.maxSalary) return false;
    if (params.salary !== undefined && item.salary !== params.salary) return false;
    if (params.value !== undefined && item.value !== params.value) return false;
    return true;
  });
  res.status(200).json(filtered);
});

// POST /filter - via body
router.post('/filter', (req, res) => {
  const params = normalizeQuery(req.body);
  const filtered = items.filter(item => {
    if (params.maxSalary !== undefined && item.salary > params.maxSalary) return false;
    if (params.salary !== undefined && item.salary !== params.salary) return false;
    if (params.value !== undefined && item.value !== params.value) return false;
    return true;
  });
  res.status(200).json(filtered);
});

module.exports = router;