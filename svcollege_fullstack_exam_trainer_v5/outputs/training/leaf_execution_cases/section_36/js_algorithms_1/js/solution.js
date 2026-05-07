// solve.js
function solve(input) {
  // דוגמה פשוטה: אם הקלט מחרוזת, מחזירים את האורך
  // אם לא, מחזירים 0 (כדי להיות דטרמיניסטיים)
  if (typeof input === 'string') {
    return input.length;
  }
  return 0;
}

module.exports = { solve };