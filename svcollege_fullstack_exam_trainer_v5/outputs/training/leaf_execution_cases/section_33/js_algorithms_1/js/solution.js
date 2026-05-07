function solve(binaryArray) {
    // Convert binary array to decimal number
    let decimal = 0;
    const n = binaryArray.length;
    for (let i = 0; i < n; i++) {
        if (binaryArray[i] === 1) {
            decimal += Math.pow(2, n - 1 - i);
        }
    }

    // Check if decimal is a palindrome
    const str = String(decimal);
    const reversed = str.split('').reverse().join('');
    return str === reversed;
}

module.exports = { solve };