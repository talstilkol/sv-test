const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

const items = [
  { id: 1, name: 'Plane A', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Plane B', value: 200, salary: 4500, grade: 'B' },
  { id: 3, name: 'Plane C', value: 150, salary: 5200, grade: 'A' },
  { id: 4, name: 'Plane D', value: 120, salary: 4800, grade: 'C' },
  { id: 5, name: 'Plane E', value: 180, salary: 5100, grade: 'B' }
];

router.post('/filter', (req, res) => {
  const { value } = req.body;
  
  if (value === undefined || value === null) {
    return res.status(400).json({ error: 'Missing required field: value' });
  }
  
  const filteredItems = items.filter(item => item.value === value);
  res.status(200).json(filteredItems);
});

module.exports = router;