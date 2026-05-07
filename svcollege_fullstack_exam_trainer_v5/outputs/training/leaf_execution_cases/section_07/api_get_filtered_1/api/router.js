const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

const items = [
  { id: 1, name: 'Alice', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Bob', value: 200, salary: 4000, grade: 'B' },
  { id: 3, name: 'Charlie', value: 150, salary: 6000, grade: 'C' },
  { id: 4, name: 'Diana', value: 300, salary: 4500, grade: 'A' }
];

router.post('/filter', (req, res) => {
  const { body, query } = req;
  const possibleKeys = ['maxSalary', 'max_salary', 'salary', 'value', 'threshold'];
  
  let maxSalary = null;

  // Try to get the value from body first, then query
  for (const key of possibleKeys) {
    if (body.hasOwnProperty(key)) {
      maxSalary = Number(body[key]);
      break;
    } else if (query.hasOwnProperty(key)) {
      maxSalary = Number(query[key]);
      break;
    }
  }

  // Validate: must be a finite number
  if (maxSalary === null || !Number.isFinite(maxSalary)) {
    return res.status(400).json({ error: 'Invalid or missing filter parameter. Use one of: maxSalary, max_salary, salary, value, threshold' });
  }

  const filtered = items.filter(item => item.salary <= maxSalary);

  res.status(200).json(filtered);
});

module.exports = router;