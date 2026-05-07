const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

const items = [
  { id: 1, name: "Alice", value: 80, salary: 5000, grade: 85 },
  { id: 2, name: "Bob", value: 70, salary: 4500, grade: 72 },
  { id: 3, name: "Charlie", value: 75, salary: 4800, grade: 78 },
  { id: 4, name: "Diana", value: 82, salary: 5200, grade: 88 },
  { id: 5, name: "Eve", value: 68, salary: 4200, grade: 69 }
];

router.get('/', (req, res) => {
  res.status(200).json(items);
});

router.post('/filter', (req, res) => {
  const { value } = req.body;
  const filteredItems = items.filter(item => item.value > value);
  res.status(200).json(filteredItems);
});

module.exports = router;