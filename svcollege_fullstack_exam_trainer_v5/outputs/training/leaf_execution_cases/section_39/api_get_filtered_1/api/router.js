const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only - fixed and deterministic
const items = [
  { id: 1, name: 'Product A', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Product B', value: 200, salary: 6000, grade: 'B' },
  { id: 3, name: 'Product C', value: 150, salary: 5500, grade: 'C' },
  { id: 4, name: 'Product D', value: 300, salary: 7000, grade: 'A' }
];

// GET /?maxSalary=6000&value=150
router.get('/', (req, res) => {
  const { maxSalary, max_salary, salary, value, threshold } = req.query;

  let filtered = [...items];

  // Helper to get value from multiple possible keys
  const getQueryValue = (keys) => {
    for (const key of keys) {
      if (req.query[key] !== undefined) {
        return parseFloat(req.query[key]);
      }
    }
    return undefined;
  };

  // Filter by salary (max)
  const maxSalaryVal = getQueryValue(['maxSalary', 'max_salary', 'salary']);
  if (maxSalaryVal !== undefined) {
    filtered = filtered.filter(item => item.salary <= maxSalaryVal);
  }

  // Filter by value (threshold)
  const thresholdVal = getQueryValue(['value', 'threshold']);
  if (thresholdVal !== undefined) {
    filtered = filtered.filter(item => item.value >= thresholdVal);
  }

  res.json(filtered);
});

// POST /filter with body: { maxSalary: 6000, value: 150 }
router.post('/filter', (req, res) => {
  const { maxSalary, max_salary, salary, value, threshold } = req.body;

  let filtered = [...items];

  // Helper to get value from multiple possible keys
  const getBodyValue = (keys) => {
    for (const key of keys) {
      if (req.body[key] !== undefined) {
        return parseFloat(req.body[key]);
      }
    }
    return undefined;
  };

  // Filter by salary (max)
  const maxSalaryVal = getBodyValue(['maxSalary', 'max_salary', 'salary']);
  if (maxSalaryVal !== undefined) {
    filtered = filtered.filter(item => item.salary <= maxSalaryVal);
  }

  // Filter by value (threshold)
  const thresholdVal = getBodyValue(['value', 'threshold']);
  if (thresholdVal !== undefined) {
    filtered = filtered.filter(item => item.value >= thresholdVal);
  }

  res.json(filtered);
});

module.exports = router;