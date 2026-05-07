const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

const items = [
  { id: 1, name: 'Alice', value: 100, salary: 5000, grade: 'A', license: true },
  { id: 2, name: 'Bob', value: 200, salary: 4000, grade: 'B', license: false },
  { id: 3, name: 'Carol', value: 150, salary: 4500, grade: 'A', license: true },
  { id: 4, name: 'David', value: 300, salary: 6000, grade: 'C', license: false }
];

function toBoolean(value) {
  if (typeof value === 'boolean') return value;
  if (value == null) return null;
  const str = String(value).toLowerCase().trim();
  if (['true', '1', 'yes', 'y', 't'].includes(str)) return true;
  if (['false', '0', 'no', 'n', 'f'].includes(str)) return false;
  return null;
}

router.post('/filter', (req, res) => {
  const { body, query } = req;
  const licenseParam = body.license ?? body.is_licensed ?? body.has_license ?? body.licensed ??
                       query.license ?? query.is_licensed ?? query.has_license ?? query.licensed;

  const licenseFilter = toBoolean(licenseParam);
  if (licenseFilter === null && licenseParam != null) {
    return res.status(400).json({ error: 'Invalid license value. Expected boolean-like value.' });
  }

  const filtered = licenseFilter === null
    ? items
    : items.filter(item => item.license === licenseFilter);

  res.status(200).json(filtered);
});

module.exports = router;