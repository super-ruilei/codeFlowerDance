/*
Given an array of integers that is already sorted in ascending order,
find two numbers such that they add up to a specific target number.

Note:
You may assume that each input would have exactly one solution
you may not use the same element twice.

Input: numbers={2, 7, 11, 15}, target=9
Output: index1=1, index2=2
*/

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum2 = function (numbers, target) {
  let map = {};
  return numbers.reduce((a, b, i) => {
    let tarNum = target - b;
    if (map[tarNum] !== undefined) {
      a.push(map[tarNum] + 1);
      a.push(i + 1);
    } else {
      map[b] = i;
    }
    return a;
  }, []);
};

// use 2 pointer to shrink without using map since it is sorted
var twoSum = function (numbers, target) {
  let left = 0,
    right = numbers.length - 1;
  while(left < right) {
    let can = numbers[left] + numbers[right];
    if(can > target) right--;
    else if(can < target) left++;
    else return [left + 1, right + 1];
  }
};

export default twoSum;
