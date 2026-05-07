function getBookStats(books) {
  if (!Array.isArray(books)) {
    throw new Error('Input must be an array');
  }

  const totalBooks = books.length;
  const availableCount = books.filter(b => b.isAvailable).length;
  const borrowedCount = totalBooks - availableCount;
  
  if (totalBooks === 0) {
    return {
      totalBooks: 0,
      availableCount: 0,
      borrowedCount: 0,
      oldestYear: null,
      newestYear: null,
      mostCommonGenre: null
    };
  }

  const years = books.map(b => b.year);
  const oldestYear = Math.min(...years);
  const newestYear = Math.max(...years);

  const genreCounts = {};
  let mostCommonGenre = null;
  let maxCount = 0;
  for (const book of books) {
    const g = book.genre;
    genreCounts[g] = (genreCounts[g] || 0) + 1;
    if (genreCounts[g] > maxCount) {
      maxCount = genreCounts[g];
      mostCommonGenre = g;
    }
  }

  return {
    totalBooks,
    availableCount,
    borrowedCount,
    oldestYear,
    newestYear,
    mostCommonGenre
  };
}

module.exports = getBookStats;
