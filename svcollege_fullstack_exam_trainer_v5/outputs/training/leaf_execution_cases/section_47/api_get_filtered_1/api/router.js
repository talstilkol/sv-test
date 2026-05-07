const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

const items = [
  { id: 12345, name: ' קופסא תכלת', value: 100, salary: 5000, grade: 'A' },
  { id: 78544, name: ' קופסא אדומה', value: 200, salary: 7000, grade: 'B' },
  { id: 33221, name: ' קופסא ירוקה', value: 150, salary: 6000, grade: 'A' }
];

router.get('/filter', (req, res) => {
  const { maxSalary, max_salary, salary, value, threshold } = req.query;
  const rawThreshold = maxSalary || max_salary || salary || value || threshold;
  
  if (rawThreshold === undefined) {
    return res.status(400).json({ error: 'Missing filter parameter: one of maxSalary, max_salary, salary, value, threshold is required' });
  }

  const thresholdNum = Number(rawThreshold);
  if (isNaN(thresholdNum)) {
    return res.status(400).json({ error: 'Filter parameter must be a number' });
  }

  const filtered = items.filter(item => item.salary <= thresholdNum);
  res.status(200).json(filtered);
});

module.exports = router;