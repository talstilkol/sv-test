const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only - fixed and deterministic
const items = [
  { id: 1, name: 'Item A', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Item B', value: 200, salary: 6000, grade: 'B' },
  { id: 3, name: 'Item C', value: 150, salary: 5500, grade: 'A' },
  { id: 4, name: 'Item D', value: 300, salary: 7000, grade: 'C' }
];

// Helper: extract value from query/body using aliases
function getParamValue(params, aliases) {
  for (const alias of aliases) {
    if (params[alias] !== undefined && params[alias] !== null) {
      const val = Number(params[alias]);
      return isNaN(val) ? undefined : val;
    }
  }
  return undefined;
}

// POST /filter - filter using body
router.post('/filter', (req, res) => {
  const { maxSalary, max_salary, salary, value, threshold } = req.body || {};
  
  const maxSalaryVal = getParamValue(req.body, ['maxSalary', 'max_salary', 'salary']);
  const valueThreshold = getParamValue(req.body, ['value', 'threshold']);

  let filtered = items.filter(item => {
    if (maxSalaryVal !== undefined && item.salary > maxSalaryVal) return false;
    if (valueThreshold !== undefined && item.value < valueThreshold) return false;
    return true;
  });

  res.status(200).json(filtered);
});

// GET /filter - filter using query
router.get('/filter', (req, res) => {
  const { maxSalary, max_salary, salary, value, threshold } = req.query || {};

  const maxSalaryVal = getParamValue(req.query, ['maxSalary', 'max_salary', 'salary']);
  const valueThreshold = getParamValue(req.query, ['value', 'threshold']);

  let filtered = items.filter(item => {
    if (maxSalaryVal !== undefined && item.salary > maxSalaryVal) return false;
    if (valueThreshold !== undefined && item.value < valueThreshold) return false;
    return true;
  });

  res.status(200).json(filtered);
});

module.exports = router;