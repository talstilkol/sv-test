const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Fixed test data (not used directly in this GET, but required by contract)
const items = [
  { id: 1, name: 'Alice', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Bob', value: 200, salary: 4000, grade: 'B' },
  { id: 3, name: 'Charlie', value: 150, salary: 4500, grade: 'A' }
];

// Helper: sort digits without using Array.prototype.sort()
function sortDigits(num) {
  if (num === 0) return 0;
  const digits = [];
  let n = Math.abs(num);
  while (n > 0) {
    digits.push(n % 10);
    n = Math.floor(n / 10);
  }
  // Bubble sort (simple, no sort())
  for (let i = 0; i < digits.length; i++) {
    for (let j = 0; j < digits.length - i - 1; j++) {
      if (digits[j] > digits[j + 1]) {
        const temp = digits[j];
        digits[j] = digits[j + 1];
        digits[j + 1] = temp;
      }
    }
  }
  // Reconstruct number
  let result = 0;
  for (const d of digits) {
    result = result * 10 + d;
  }
  return num < 0 ? -result : result;
}

router.get('/', (req, res) => {
  const { number } = req.query;
  if (number === undefined || isNaN(Number(number)) || !Number.isInteger(Number(number))) {
    return res.status(400).json({ error: 'Invalid or missing "number" query parameter. Must be an integer.' });
  }
  const num = Number(number);
  const sorted = sortDigits(num);
  res.json({ original: num, sortedDigits: sorted });
});

module.exports = router;