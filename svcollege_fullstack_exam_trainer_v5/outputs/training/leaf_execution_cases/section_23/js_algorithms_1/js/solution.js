function solve(input) {
  // input is a string like "2, 3, 5"
  const parts = input.trim().split(',').map(Number);
  const a1 = parts[0];
  const d = parts[1];
  const n = parts[2];

  // Sum of first n terms of arithmetic sequence
  const sum = (n / 2) * (2 * a1 + (n - 1) * d);
  return sum;
}

module.exports = { solve };