function solve(matrix) {
  // בדיקה שהקלט הוא מטריצה תקינה (מערך של מערכים)
  if (!Array.isArray(matrix) || !matrix.every(row => Array.isArray(row))) {
    throw new Error('Input must be a matrix (array of arrays)');
  }

  // פלט ריק אם המטריצה ריקה
  if (matrix.length === 0 || matrix.every(row => row.length === 0)) {
    return [];
  }

  // איסוף כל הערכים למערך אחד
  const flat = matrix.flat();

  // בדיקה שכולם מספרים
  for (const val of flat) {
    if (typeof val !== 'number' || Number.isNaN(val)) {
      throw new Error('All values must be numbers');
    }
  }

  // ספירת מופעים
  const counts = new Map();
  for (const num of flat) {
    counts.set(num, (counts.get(num) || 0) + 1);
  }

  // המרת למערך של אובייקטים, ממוין לפי המספר
  const result = Array.from(counts.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([num, count]) => ({ num, count }));

  return result;
}

module.exports = { solve };