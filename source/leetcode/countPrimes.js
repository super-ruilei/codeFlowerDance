/*
Count the number of prime numbers less than a non-negative number, n.
*/

/**
 * @param {number} n
 * @return {number}
 */
// count prime using a map.
// need two for to create map. O(n) for space
var countPrimes = function (n) {
  const nonPrimeArr = [];
  let count = 0;
  for (let i = 2; i < n; i++) {
    if (!nonPrimeArr[i]) count++;
    for (let j = 2; j * i < n; j++) {
      nonPrimeArr[j*i] = true;
    }
  }
  return count;
};

export default countPrimes;
