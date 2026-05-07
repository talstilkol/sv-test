const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only
const items = [
  { id: 1, name: 'Red Box', value: 0, salary: 5000, grade: 'A' },
  { id: 2, name: 'Blue Folder', value: 10, salary: 6000, grade: 'B' },
  { id: 3, name: 'Green Chair', value: 0, salary: 4500, grade: 'C' },
  { id: 4, name: 'Yellow Lamp', value: 5, salary: 3000, grade: 'A' }
];

router.get('/', (req, res) => {
  const { value } = req.query;

  if (value === undefined) {
    // No filter: return all items
    return res.json(items);
  }

  const filterValue = Number(value);
  const filtered = items.filter(item => item.value === filterValue);

  res.json(filtered);
});

module.exports = router;