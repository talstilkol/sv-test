const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only - fixed and deterministic
const items = [
  { id: 1, name: 'Item A', value: 100, salary: 4000, grade: 'A' },
  { id: 2, name: 'Item B', value: 200, salary: 5500, grade: 'B' },
  { id: 3, name: 'Item C', value: 150, salary: 4800, grade: 'C' },
  { id: 4, name: 'Item D', value: 120, salary: 5200, grade: 'B' }
];

// Helper: normalize query/body keys to standard names
function normalizeParams(params) {
  const normalized = {};
  const aliases = {
    maxSalary: ['maxSalary', 'max_salary', 'salary'],
    value: ['value'],
    threshold: ['threshold', 'min_value', 'minValue']
  };

  for (const [key, values] of Object.entries(aliases)) {
    for (const alias of values) {
      if (params[alias] !== undefined) {
        normalized[key] = Number(params[alias]);
        break;
      }
    }
  }

  return normalized;
}

// GET /filter - via query
router.get('/filter', (req, res) => {
  const params = normalizeParams(req.query);
  const result = items.filter(item => {
    if (params.maxSalary !== undefined && item.salary > params.maxSalary) return false;
    if (params.value !== undefined && item.value !== params.value) return false;
    if (params.threshold !== undefined && item.value < params.threshold) return false;
    return true;
  });
  res.status(200).json(result);
});

// POST /filter - via body
router.post('/filter', (req, res) => {
  const params = normalizeParams(req.body);
  const result = items.filter(item => {
    if (params.maxSalary !== undefined && item.salary > params.maxSalary) return false;
    if (params.value !== undefined && item.value !== params.value) return false;
    if (params.threshold !== undefined && item.value < params.threshold) return false;
    return true;
  });
  res.status(200).json(result);
});

module.exports = router;