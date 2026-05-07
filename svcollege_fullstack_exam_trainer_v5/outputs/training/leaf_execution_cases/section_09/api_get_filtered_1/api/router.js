const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only
const items = [
  { id: 1, name: 'Plane A', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Plane B', value: 200, salary: 6000, grade: 'B' },
  { id: 3, name: 'Plane C', value: 150, salary: 5500, grade: 'A' },
  { id: 4, name: 'Plane D', value: 80,  salary: 4500, grade: 'C' }
];

// POST /filter - filter items where value >= threshold
router.post('/filter', (req, res) => {
  const { body, query } = req;

  // Try to get threshold from body or query using aliases
  const aliases = ['maxSalary', 'max_salary', 'salary', 'value', 'threshold'];
  let threshold = null;

  for (const alias of aliases) {
    if (body.hasOwnProperty(alias)) {
      threshold = body[alias];
      break;
    }
    if (query.hasOwnProperty(alias)) {
      threshold = query[alias];
      break;
    }
  }

  // Validate threshold
  if (threshold === null || isNaN(Number(threshold))) {
    return res.status(400).json({ error: 'Missing or invalid threshold parameter' });
  }

  threshold = Number(threshold);

  // Filter items where value >= threshold
  const filtered = items.filter(item => item.value >= threshold);

  res.status(200).json(filtered);
});

module.exports = router;