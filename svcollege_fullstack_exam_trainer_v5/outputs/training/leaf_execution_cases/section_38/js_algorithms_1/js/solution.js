// js_algorithms.1.js
function solve(input) {
  // input הוא מערך של רכישות (למשל ['apple', 'banana', 'apple'])
  // מחזיר את מספר הרכישות (ביקורים במחסן)
  if (!Array.isArray(input)) {
    return 0; // הגנה על קלט לא תקין
  }
  return input.length;
}

module.exports = { solve };