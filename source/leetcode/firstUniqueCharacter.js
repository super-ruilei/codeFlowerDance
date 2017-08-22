/*
Given a string, find the first non-repeating character in it and return it's index.
If it doesn't exist, return -1.

Examples:

s = "leetcode"
return 0.

s = "loveleetcode",
return 2.
Note: You may assume the string contain only lowercase letters.
*/

/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
  let item = s.split('').find(a => s.indexOf(a) === s.lastIndexOf(a));
  return s.indexOf(item);
};

export default firstUniqChar;
