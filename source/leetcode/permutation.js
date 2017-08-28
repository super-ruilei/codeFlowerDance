/*
Medium
Recursion
Given a collection of distinct numbers, return all possible permutations.
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permutation = function (nums) {
  let level = arguments[1] || nums.length;
  if (level === 1) return nums.map(num => [num]);
  return permutation(nums, level - 1).reduce((nest, arr) => {
    let restNums = nums.filter(num => !arr.includes(num));
    return nest.concat(restNums.map(a => arr.concat(a)));
  }, [])
};

export default permutation;
