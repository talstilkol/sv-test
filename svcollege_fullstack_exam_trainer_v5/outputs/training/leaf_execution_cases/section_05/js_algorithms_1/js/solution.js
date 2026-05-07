// solution.js
function solve(input) {
  // לדוגמה: אם הקלט הוא מחרוזת, נחזיר את האורך
  if (typeof input === 'string') {
    return input.length;
  }
  // אם הקלט הוא מערך, נחזיר את הסכום
  if (Array.isArray(input)) {
    return input.reduce((sum, x) => sum + x, 0);
  }
  // אם לא מזוהה, נחזיר null
  return null;
}

module.exports = { solve };