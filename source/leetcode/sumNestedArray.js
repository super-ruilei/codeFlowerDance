/*
Easy
Recursion
Write a function that sums all numbers in an array that can have nested sub-arrays.
*/
/* simplier:
  return arr.reduce((a, b) => {
    return a + sumNestedArray(b);
  }, 0);
*/
var sumNestedArray = function(arr) {
  return arr.reduce((a, b) => {
    if( !Array.isArray(b) ) return a + b;
    return a + sumNestedArray(b);
  }, 0);
}

// no iteratoin: sum(input, input.length-1)
// simplier: return sumNestedArray2(arr, i - 1) + current;
var sumNestedArray2 = function(arr, i) {
  if(i < 0) return 0;
  let current = arr[i];
  if(Array.isArray(current)) {
    current = sumNestedArray2(current, current.length - 1);
  }
  return sumNestedArray2(arr, i - 1) + current;
}

export default sumNestedArray;
