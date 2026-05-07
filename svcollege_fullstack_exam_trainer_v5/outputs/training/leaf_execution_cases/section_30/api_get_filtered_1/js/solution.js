function solve(number) {
  // המרת המספר למחרוזת כדי לגשת לספרות
  const str = String(number);
  
  // מערך לספירת הספרות (אינדקסים 0–9)
  const counts = new Array(10).fill(0);
  
  // ספירת כל ספרה
  for (let char of str) {
    const digit = parseInt(char, 10);
    counts[digit]++;
  }
  
  // בניית המחרוזת הממוינת
  let resultStr = '';
  for (let digit = 0; digit <= 9; digit++) {
    resultStr += String(digit).repeat(counts[digit]);
  }
  
  // המרת התוצאה למספר
  return parseInt(resultStr, 10);
}

module.exports = { solve };