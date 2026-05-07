const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

const items = [
  { id: 1, name: 'Alice', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Bob', value: 200, salary: 4000, grade: 'B' },
  { id: 3, name: 'Charlie', value: 150, salary: 6000, grade: 'A' },
  { id: 4, name: 'Diana', value: 300, salary: 4500, grade: 'C' }
];

router.post('/filter', (req, res) => {
  const { body, query } = req;
  const candidateKeys = ['maxSalary', 'max_salary', 'salary', 'value', 'threshold'];
  let threshold = null;

  // Try to get threshold from body first, then query
  for (const key of candidateKeys) {
    if (body.hasOwnProperty(key)) {
      threshold = Number(body[key]);
      break;
    } else if (query.hasOwnProperty(key)) {
      threshold = Number(query[key]);
      break;
    }
  }

  // If no threshold provided, return all items
  if (threshold === null || isNaN(threshold)) {
    return res.status(200).json(items);
  }

  const filtered = items.filter(item => item.salary <= threshold);
  res.status(200).json(filtered);
});

module.exports = router;