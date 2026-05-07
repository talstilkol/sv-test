function solve(input) {
  const workers = [];
  const products = [
    { id: 1, name: 'עוגת שוקולד', price: 25 },
    { id: 2, name: 'קינוח בקקאו', price: 30 },
    { id: 3, name: 'קינוח פירות', price: 35 },
    { id: 4, name: 'עוגת גבינה', price: 28 },
    { id: 5, name: 'ביסקוויט', price: 15 }
  ];

  return { workers, products };
}

module.exports = { solve };