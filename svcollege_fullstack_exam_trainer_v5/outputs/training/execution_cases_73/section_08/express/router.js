const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

const items = [
  { id: 1, name: 'Company A', value: 'Flight1', salary: 5000, grade: 'A' },
  { id: 2, name: 'Company B', value: 'Flight2', salary: 6000, grade: 'B' },
  { id: 3, name: 'Company C', value: 'Flight3', salary: 7000, grade: 'C' },
  { id: 4, name: 'Company D', value: 'Flight4', salary: 8000, grade: 'A' },
  { id: 5, name: 'Company E', value: 'Flight5', salary: 9000, grade: 'B' }
];

router.post('/filter', (req, res) => {
  const { value } = req.body;
  
  if (typeof value !== 'string') {
    return res.status(400).json({ error: 'Invalid input: value must be a string' });
  }

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(value.toLowerCase())
  );

  res.status(200).json(filteredItems);
});

module.exports = router;