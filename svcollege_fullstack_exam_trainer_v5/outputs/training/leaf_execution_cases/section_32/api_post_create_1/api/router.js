const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// מערך בדיקה קבוע
const items = [
  { id: 1, name: 'Alice', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Bob', value: 200, salary: 6000, grade: 'B' },
  { id: 3, name: 'Charlie', value: 150, salary: 5500, grade: 'A' }
];

// middleware לניתוח גוף בקשות JSON
router.use(express.json());

// POST / - יצירת פריט חדש
router.post('/', (req, res) => {
  const { name, value, salary, grade } = req.body;

  // אימות: כל השדות חובה, וסוגים תקניים
  if (!name || typeof name !== 'string' ||
      value === undefined || typeof value !== 'number' ||
      salary === undefined || typeof salary !== 'number' ||
      !grade || typeof grade !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid fields: name (string), value (number), salary (number), grade (string)' });
  }

  // יצירת id חדש: max(id) + 1
  const maxId = items.reduce((max, item) => Math.max(max, item.id), 0);
  const newItem = {
    id: maxId + 1,
    name,
    value,
    salary,
    grade
  };

  items.push(newItem);

  res.status(201).json(newItem);
});

module.exports = router;