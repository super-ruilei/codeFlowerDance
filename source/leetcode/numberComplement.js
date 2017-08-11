/*
  Easy
  Given a positive integer, output its complement number.
  eg: 5 -> 2 (101 010)
  eg: 1 -> 0 (1 0)
  Note:
  Within the range of a 32-bit signed integer.
 */
/**
 * @param {number} num
 * @return {number}
 */
var numberComplement = function(num) {
  let res = (num & 1) ^ 1, exp = 2;
  while(num >>= 1) {
    res += exp * ((num & 1) ^ 1);
    exp *= 2;
  }
  return res;
};
