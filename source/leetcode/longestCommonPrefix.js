/*
Easy
Write a function to find the longest common prefix string amongst an array of strings.
*/

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (!strs.length) return '';
  // select the shortest and split by letter
  let charset = strs.reduce((a, b) => b.length < a.length ? b : a, strs[0]).split('');
  for (let i = 0; i < charset.length; i++) {
    let cur = charset[i];
    if (!strs.every(a => a[i] === cur)) return charset.join('').slice(0, i);
  }
  return charset.join('');
};

export default longestCommonPrefix;
