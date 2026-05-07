const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

const items = [
  { id: 1, name: 'Alice', value: 100, salary: 4000, grade: 2 },
  { id: 2, name: 'Bob', value: 200, salary: 5500, grade: 3 },
  { id: 3, name: 'Charlie', value: 150, salary: 3000, grade: 1 },
  { id: 4, name: 'Diana', value: 300, salary: 6000, grade: 4 },
  { id: 5, name: 'Eve', value: 250, salary: 4500, grade: 2 }
];

router.get('/', (req, res) => {
  const query = req.query;
  let maxSalary = Infinity;

  // חיפוש ערך מירבי של salary מתוך aliases
  const salaryAliases = ['maxSalary', 'max_salary', 'salary', 'value', 'threshold'];
  for (const alias of salaryAliases) {
    if (query[alias] !== undefined) {
      const val = Number(query[alias]);
      if (!isNaN(val)) {
        maxSalary = val;
        break;
      }
    }
  }

  const filtered = items.filter(item => item.salary <= maxSalary);

  res.status(200).json(filtered);
});

module.exports = router;