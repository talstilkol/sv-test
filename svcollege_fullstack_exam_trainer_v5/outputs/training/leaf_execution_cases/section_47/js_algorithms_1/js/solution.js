function solve(input) {
  if (typeof input !== 'string') {
    input = String(input);
  }
  const lower = input.toLowerCase();
  if (lower.includes('קופסא אדומה')) {
    return false;
  }
  // אם יש קופסאות אחרות – נניח שדורשות מלגזה
  if (lower.includes('קופסא') && !lower.includes('אדומה')) {
    return true;
  }
  // אם אין קופסה בכלל – נניח שלא צריך מלגזה
  return false;
}

module.exports = { solve };