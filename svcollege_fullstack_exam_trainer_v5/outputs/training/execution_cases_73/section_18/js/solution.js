function solve(matrix) {
  try {
    if (!Array.isArray(matrix) || matrix.length === 0) {
      throw new Error('Input must be a non-empty matrix');
    }

    const counts = {};
    
    for (const row of matrix) {
      if (!Array.isArray(row)) {
        throw new Error('Each row must be an array');
      }
      for (const num of row) {
        if (typeof num !== 'number' || isNaN(num)) {
          throw new Error('All values in the matrix must be numbers');
        }
        counts[num] = (counts[num] || 0) + 1;
      }
    }

    const result = [];
    for (const num in counts) {
      result.push({
        num: Number(num),
        count: counts[num]
      });
    }

    // Sort by number in ascending order
    result.sort((a, b) => a.num - b.num);

    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = { solve };