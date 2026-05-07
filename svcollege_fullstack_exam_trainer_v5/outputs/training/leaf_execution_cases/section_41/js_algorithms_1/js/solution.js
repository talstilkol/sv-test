// js_algorithms.1.js
function solve(input) {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }

  // Title Case: כל מילה מתחילה באות גדולה, שאר האותיות קטנות
  return input
    .toLowerCase()
    .split(' ')
    .map(word => word ? word[0].toUpperCase() + word.slice(1) : '')
    .join(' ');
}

module.exports = { solve };