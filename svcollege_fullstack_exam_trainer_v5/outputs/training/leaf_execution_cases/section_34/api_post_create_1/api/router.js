const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// מערך בדיקה קבוע
const items = [
  { id: 1, name: 'Alice', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Bob', value: 200, salary: 6000, grade: 'B' }
];

// middleware ל-parse JSON ב-body
router.use(express.json());

// POST / - יצירת פריט חדש
router.post('/', (req, res) => {
  const { name, value, salary, grade } = req.body;

  // validation: חובה שجميع השדות נמצאים
  if (!name || value === undefined || salary === undefined || !grade) {
    return res.status(400).json({ error: 'Missing required fields: name, value, salary, grade' });
  }

  // יצירת ID חדש (הכי פשוט: max existing + 1)
  const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;

  const newItem = {
    id: newId,
    name,
    value,
    salary,
    grade
  };

  items.push(newItem);

  res.status(201).json(newItem);
});

module.exports = router;