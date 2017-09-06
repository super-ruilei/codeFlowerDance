/*
Easy
Stack
Given a string containing just the characters '(', ')', '{', '}', '[' and ']',
determine if the input string is valid.

The brackets must close in the correct order, "()" and "()[]{}" are all valid
but "(]" and "([)]" are not.
*/

/**
 * @param {string} s
 * @return {boolean}
 */
// Use stack
var isValidParentheses = function (s) {
  const map = {
    ')': '(',
    ']': '[',
    '}': '{'
  };
  var stack = [];
  return s.split('').every(a => {
    if (!map[a]) stack.push(a);
    if (map[a] && stack.pop() !== map[a]) return false;
    return true;
  }) && stack.length === 0;
};

export default isValidParentheses;
