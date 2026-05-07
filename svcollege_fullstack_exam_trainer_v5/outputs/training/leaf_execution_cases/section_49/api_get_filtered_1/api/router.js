const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only
const items = [
  { id: 1, name: 'Alice', value: 100, salary: 8000, grade: 2 },
  { id: 2, name: 'Bob', value: 150, salary: 12000, grade: 3 },
  { id: 3, name: 'Charlie', value: 200, salary: 15000, grade: 4 },
  { id: 4, name: 'Diana', value: 75, salary: 6000, grade: 1 },
  { id: 5, name: 'Eve', value: 180, salary: 11000, grade: 3 }
];

router.get('/filter', (req, res) => {
  const {
    maxSalary, max_salary, salary,
    value, threshold,
    grade
  } = req.query;

  const maxSalaryVal = Number(maxSalary || max_salary || salary || Infinity);
  const valueThreshold = Number(value || threshold || -Infinity);
  const gradeVal = grade !== undefined ? Number(grade) : undefined;

  const filtered = items.filter(item => {
    const salaryOk = item.salary <= maxSalaryVal;
    const valueOk = item.value >= valueThreshold;
    const gradeOk = gradeVal === undefined || item.grade === gradeVal;
    return salaryOk && valueOk && gradeOk;
  });

  res.status(200).json(filtered);
});

module.exports = router;