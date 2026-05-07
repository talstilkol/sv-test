const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Deterministic fixture data
const items = [
  { id: 1, name: 'Alice', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Bob', value: 200, salary: 6000, grade: 'B' },
  { id: 3, name: 'Charlie', value: 300, salary: 7000, grade: 'C' }
];

router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    
    items.splice(index, 1);
    
    const totalFlights = items.length;
    const totalPassengers = items.reduce((sum, item) => sum + item.value, 0);
    
    res.status(200).json({
      message: `Flight ${id} deleted successfully. Total flights: ${totalFlights}, Total passengers in air: ${totalPassengers}`
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;