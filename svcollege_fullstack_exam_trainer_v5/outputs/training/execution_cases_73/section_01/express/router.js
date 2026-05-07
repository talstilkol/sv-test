const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

const items = [
  { id: 1, name: "Alice Cohen", value: 95, salary: 12000, grade: "A" },
  { id: 2, name: "Bob Levi", value: 88, salary: 11000, grade: "B" },
  { id: 3, name: "Carol Mizrahi", value: 92, salary: 12500, grade: "A" },
  { id: 4, name: "David Israeli", value: 85, salary: 10500, grade: "B" },
  { id: 5, name: "Elena Shapira", value: 97, salary: 13000, grade: "A" }
];

router.get('/', (req, res) => {
  res.status(200).json(items);
});

module.exports = router;