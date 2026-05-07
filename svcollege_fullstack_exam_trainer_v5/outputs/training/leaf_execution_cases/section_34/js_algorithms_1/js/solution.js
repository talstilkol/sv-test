// file: solve.js
function solve(input) {
  // לדוגמה: אם הקלט הוא מחרוזת, נחזיר את האורך
  // (הערה: בפועל, התשובה תלויה בשאלה הספציפית – כאן יש רק מבנה כללי)
  if (typeof input === 'string') {
    return input.length;
  } else if (Array.isArray(input)) {
    return input.reduce((acc, val) => acc + val, 0);
  } else if (typeof input === 'number') {
    return input * 2;
  }
  // אם לא ידוע מה הקלט – נחזיר את הקלט כמזהה (למשל אם צריך להחזיר אותו unchanged)
  return input;
}

module.exports = { solve };