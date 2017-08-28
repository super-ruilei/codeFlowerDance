/*

Find all the elements of [1, n] inclusive that do not appear in this array.
without extra space and in O(n) runtime?
Example:
Input:
[4,3,2,7,8,2,3,1]

Output:
[5,6]
*/

// inpure function with no extra space, nums[nums[i] -1] = -nums[nums[i]-1]
// mark it as seen using negative
// cannot use map here since arr in map is always original ones
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var numberDisappeared = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    let cur = Math.abs(nums[i]) - 1;
    if (nums[cur] > 0) nums[cur] = -nums[cur];
  }
  return nums.reduce((a, b, i) => {
    if (b > 0) a.push(i + 1);
    return a;
  }, []);
};

export default numberDisappeared;
