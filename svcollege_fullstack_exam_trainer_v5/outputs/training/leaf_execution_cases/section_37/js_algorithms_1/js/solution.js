function solve(hasLicense) {
  // וידוא שהקלט בוליאני (אם יש צורך, אך לפי הדרישה – רק בוליאנים)
  if (typeof hasLicense !== 'boolean') {
    throw new Error('Input must be a boolean');
  }
  return hasLicense;
}

module.exports = { solve };