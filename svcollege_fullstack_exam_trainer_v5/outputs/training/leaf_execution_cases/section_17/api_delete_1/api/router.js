const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only – fixed and deterministic
const items = [
  { id: 1, name: 'Flight A', value: 100, salary: 50, grade: 'A' },
  { id: 2, name: 'Flight B', value: 200, salary: 30, grade: 'B' },
  { id: 3, name: 'Flight C', value: 150, salary: 40, grade: 'C' }
];

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const index = items.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Flight not found' });
  }

  // Remove the item
  items.splice(index, 1);

  // Calculate stats
  const totalFlights = items.length;
  const totalPassengers = items.reduce((sum, item) => sum + (item.salary || 0), 0);

  res.json({
    message: 'Flight deleted successfully',
    totalFlights,
    totalPassengersInAir: totalPassengers
  });
});

module.exports = router;