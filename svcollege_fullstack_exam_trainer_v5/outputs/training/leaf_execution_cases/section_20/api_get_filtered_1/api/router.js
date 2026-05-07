const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only
const items = [
  { id: 1, name: 'Alice', value: 100, salary: 5000, grade: 85 },
  { id: 2, name: 'Bob', value: 80, salary: 4000, grade: 72 },
  { id: 3, name: 'Charlie', value: 90, salary: 4500, grade: 78 },
  { id: 4, name: 'Dana', value: 60, salary: 3000, grade: 65 },
  { id: 5, name: 'Eve', value: 88, salary: 4800, grade: 90 }
];

router.get('/', (req, res) => {
  const threshold = parseFloat(req.query.threshold);
  const minGrade = isNaN(threshold) ? 74 : threshold;

  const filtered = items.filter(item => item.grade > minGrade);

  res.status(200).json(filtered);
});

module.exports = router;