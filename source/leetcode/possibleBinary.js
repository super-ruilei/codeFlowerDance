/*
Easy
Recursion
Write a function that generates all possible combinations of 1 and 0 for n bits.
For example, if the function receives 2 as the number of bits,
it should produce the following 4 combinations: 00,01,10,11.
You cannot use any mathematical operators.
*/

/*
  simplier:
  return possibleBinary(n-1).reduce((a, b) => {
    a.push('0' + b);
    a.push('1' + b);
    return a;
  }, []);
*/
var possibleBinary = function(n) {
  if (!n) return [];
  if (n === 1) return ['0', '1'];
  return possibleBinary(n-1).reduce((a, b) => {
    a.push('0' + b);
    a.push('1' + b);
    return a;
  }, []);
}

export default possibleBinary;
