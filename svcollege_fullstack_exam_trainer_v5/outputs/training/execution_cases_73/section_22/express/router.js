const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Deterministic fixture data
const items = [
  { id: '123456789', name: 'Alice Cohen', value: 100, salary: 12000, grade: 85 },
  { id: '987654321', name: 'Bob Levi', value: 95, salary: 11000, grade: 78 },
  { id: '456789123', name: 'Carol Mizrahi', value: 90, salary: 13000, grade: 92 }
];

router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { grade } = req.body;

    // Find item by id
    const itemIndex = items.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'ERROR' });
    }

    // Update grade
    items[itemIndex].grade = grade;

    res.status(200).json({ success: true, message: 'Update completed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'ERROR' });
  }
});

module.exports = router;