function solve(input) {
  if (typeof input !== 'string') {
    return false;
  }
  const hasBlueBox = input.includes('קופסא כחולה');
  const needsMelgaza = input.includes('melgaza') || input.includes('מלגזה');
  return hasBlueBox && needsMelgaza;
}

module.exports = { solve };