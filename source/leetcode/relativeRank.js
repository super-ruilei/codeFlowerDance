/*
Easy
Given scores of N athletes, find their relative ranks.
Who will be awarded medals: "Gold Medal", "Silver Medal" and "Bronze Medal".

Example 1:
Input: [5, 4, 3, 2, 1]
Output: ["Gold Medal", "Silver Medal", "Bronze Medal", "4", "5"]
Explanation: The first three athletes got the top three highest scores, so they got "Gold Medal", "Silver Medal" and "Bronze Medal".
For the left two athletes, you just need to output their relative ranks according to their scores.
Note:
N is a positive integer and won't exceed 10,000.
All the scores of athletes are guaranteed to be unique.
*/

/**
 * @param {number[]} nums
 * @return {string[]}
 */
var findRelativeRanks = function (nums) {
  let sorted = [...nums];
  const medalGroup = ["Gold Medal", "Silver Medal", "Bronze Medal"];
  sorted.sort((a, b) => b - a);
  return nums.map(a => medalGroup[sorted.indexOf(a)] || sorted.indexOf(a) + 1 + '');
};
