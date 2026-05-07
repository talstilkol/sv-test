function solve(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array');
  }

  const total = arr.length;
  const uniqueValues = new Set(arr);

  let evenCount = 0;
  let oddCount = 0;

  for (const value of uniqueValues) {
    if (typeof value !== 'number' || !Number.isInteger(value)) {
      throw new Error('All elements must be integers');
    }

    if (value % 2 === 0) {
      evenCount++;
    } else {
      oddCount++;
    }
  }

  return { even: evenCount, odd: oddCount, total: total };
}

module.exports = { solve };