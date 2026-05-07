function isFibonacci(arr) {
  if (arr.length < 3) return false;
  for (let i = 2; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1] + arr[i - 2]) {
      return false;
    }
  }
  return true;
}

function isArithmetic(arr) {
  if (arr.length < 2) return false;
  const diff = arr[1] - arr[0];
  for (let i = 2; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] !== diff) {
      return false;
    }
  }
  return true;
}

function isGeometric(arr) {
  if (arr.length < 2) return false;
  if (arr[0] === 0) {
    // אם האיבר הראשון 0, אז כל האיברים חייבים להיות 0 כדי להיות הנדסית
    return arr.every(x => x === 0);
  }
  const ratio = arr[1] / arr[0];
  for (let i = 2; i < arr.length; i++) {
    if (arr[i - 1] === 0) {
      // אם איבר אמצעי 0, והאיבר הבא לא 0 – לא הנדסית
      return false;
    }
    if (arr[i] / arr[i - 1] !== ratio) {
      return false;
    }
  }
  return true;
}

function solve(input) {
  // בדיקת תקינות קלט
  if (!Array.isArray(input)) {
    throw new Error('Input must be an array');
  }
  for (let i = 0; i < input.length; i++) {
    if (typeof input[i] !== 'number' || isNaN(input[i])) {
      throw new Error(`Element at index ${i} is not a valid number`);
    }
  }

  // מקרים קיצוניים
  if (input.length === 0) return 'D';
  if (input.length === 1) return 'D';

  // בדיקות סדרות
  if (isFibonacci(input)) return 'C';
  if (isArithmetic(input)) return 'A';
  if (isGeometric(input)) return 'B';

  return 'D';
}

module.exports = { solve };