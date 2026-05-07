function solve(a, b, target) {
  // מיקום 1: a, מיקום 2: b
  if (a === target) return 1;
  if (b === target) return 2;

  let prev = a;
  let curr = b;
  let position = 2;

  while (true) {
    const next = prev + curr;
    position++;
    if (next === target) return position;
    if (next > target) return -1; // הסדרה עולה, לא יתכן ש- target יופיע מאוחר יותר
    prev = curr;
    curr = next;
  }
}

module.exports = { solve };