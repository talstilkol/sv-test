const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data for testing only – fixed and deterministic
const items = [
  { id: '123456789', name: 'Alice', value: 100, salary: 5000, grade: 85 },
  { id: '987654321', name: 'Bob', value: 200, salary: 6000, grade: 90 },
  { id: '111222333', name: 'Charlie', value: 150, salary: 5500, grade: 78 }
];

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { grade } = req.body;

  // Validate that grade is provided and is a number
  if (typeof grade !== 'number' || isNaN(grade)) {
    return res.status(400).json({ error: 'ERROR' });
  }

  const student = items.find(item => item.id === id);
  if (!student) {
    return res.status(404).json({ error: 'ERROR' });
  }

  // Update grade
  student.grade = grade;

  return res.status(200).json({ success: true });
});

module.exports = router;