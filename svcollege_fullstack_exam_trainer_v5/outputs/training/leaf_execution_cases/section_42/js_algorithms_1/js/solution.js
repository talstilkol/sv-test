function solve(input) {
  const needsMelgaza = input.needsMelgaza;
  if (needsMelgaza === true) {
    return "melgaza";
  } else if (needsMelgaza === false) {
    return "no melgaza";
  } else {
    // טיפול בקלט לא תקין – נניח שגוי, נחזיר ברירת מחדל
    return "no melgaza";
  }
}

module.exports = { solve };