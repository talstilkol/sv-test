const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Deterministic fixture data
const items = [
  { id: 1, name: 'Flight A', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Flight B', value: 200, salary: 6000, grade: 'B' },
  { id: 3, name: 'Flight C', value: 150, salary: 5500, grade: 'A' },
  { id: 4, name: 'Flight D', value: 300, salary: 7000, grade: 'C' },
  { id: 5, name: 'Flight E', value: 250, salary: 6500, grade: 'B' }
];

// GET / - serve the sort control panel page
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Sort control panel',
    routes: {
      filter: 'POST /filter',
      navigation: 'Client-side navigation to /controlpanel/sort'
    }
  });
});

// POST /filter - filter items by value (deterministic, no mutation)
router.post('/filter', (req, res) => {
  const { value } = req.body;
  
  if (value === undefined || value === null) {
    return res.status(400).json({ error: 'Missing required field: value' });
  }

  const filteredItems = items.filter(item => item.value === value);
  
  res.status(200).json({
    count: filteredItems.length,
    results: filteredItems
  });
});

module.exports = router;