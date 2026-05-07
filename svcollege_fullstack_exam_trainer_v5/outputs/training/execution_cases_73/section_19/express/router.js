const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

const items = [
  { id: 1, name: "Alice", value: 85, salary: 5000, grade: "A" },
  { id: 2, name: "Bob", value: 92, salary: 6000, grade: "A+" },
  { id: 3, name: "Charlie", value: 78, salary: 4500, grade: "B" }
];

router.get('/', (req, res) => {
  res.status(200).json(items);
});

module.exports = router;