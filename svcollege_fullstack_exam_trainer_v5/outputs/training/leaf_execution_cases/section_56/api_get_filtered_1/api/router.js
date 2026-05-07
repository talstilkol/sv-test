const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

const items = [
  { id: 1, name: 'Alice', value: 100, salary: 4500, grade: 'A' },
  { id: 2, name: 'Bob', value: 200, salary: 6000, grade: 'B' },
  { id: 3, name: 'Charlie', value: 150, salary: 5000, grade: 'A' },
  { id: 4, name: 'Dana', value: 300, salary: 4000, grade: 'C' }
];

router.get('/', (req, res) => {
  const query = req.query;
  let maxSalary = null;

  // בדיקת שמות חלופיים של הפרמטר
  if (query.maxSalary !== undefined) {
    maxSalary = Number(query.maxSalary);
  } else if (query.max_salary !== undefined) {
    maxSalary = Number(query.max_salary);
  } else if (query.salary !== undefined) {
    maxSalary = Number(query.salary);
  } else if (query.value !== undefined) {
    maxSalary = Number(query.value);
  } else if (query.threshold !== undefined) {
    maxSalary = Number(query.threshold);
  }

  // אם לא הוזן פרמטר – מחזירים את כל הרשומות
  if (maxSalary === null || isNaN(maxSalary)) {
    return res.status(200).json(items);
  }

  // סינון לפי שכר מינימלי (הפרמטר הוא מקסימום)
  const filtered = items.filter(item => item.salary <= maxSalary);

  res.status(200).json(filtered);
});

module.exports = router;