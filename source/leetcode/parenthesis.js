/*
Medium
Recursion Backtrack
write a function to generate all combinations of well-formed parentheses.

For example, given n = 3, a solution set is:

[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
*/
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  let list = [];
  backtrack('', list, n, 0, 0);
  return list;
};

/**
 * @param {string} str
 * @param {string[]} result
 * @return void
 */
var backtrack = function (str, list, n, open, close) {
  // simplest
  if (str.length === n * 2) {
    list.push(str);
    return;
  }
  // simpler: believe your result
  if (open < n) backtrack(str + '(', list, n, open + 1, close);
  if (close < open) backtrack(str + ')', list, n, open, close + 1);
  return; // endcase: void return can be omit here
}

export default generateParenthesis;
