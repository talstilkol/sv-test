// דוגמה בסיסית – פונקציה שמחזירה את סכום המספרים במערך
function solve(input) {
  // אם הקלט הוא מערך של מספרים – מחזירים את הסכום
  if (Array.isArray(input) && input.every(x => typeof x === 'number')) {
    return input.reduce((sum, num) => sum + num, 0);
  }
  // אם לא – מחזירים 0 (או ערך אחר מוגדר מראש)
  return 0;
}

module.exports = { solve };