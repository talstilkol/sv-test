function solve(fullArray, partialArray) {
  let j = 0; // אינדקס במערך החלקי
  for (let i = 0; i < fullArray.length; i++) {
    if (j < partialArray.length && fullArray[i] === partialArray[j]) {
      j++;
    }
  }
  return j === partialArray.length;
}

module.exports = { solve };