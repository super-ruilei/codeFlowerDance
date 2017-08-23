/*
Easy:
Given a 2-dimension array
Calculate the perimeter
eg:
[[0,1,0,0],
 [1,1,1,0],
 [0,1,0,0],
 [1,1,0,0]]
Answer: 16
*/

/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function (grid) {
  let [island, neighbour] = grid.reduce((res, arr, index) => {
    arr.forEach((num, i) => {
      if (num) {
        res[0]++;
        if (arr[i+1]) res[1]++;
        if ((grid[index+1] && grid[index+1][i])) res[1]++;
      }
    })
    return res;
  }, [0, 0]);
  return island * 4 - neighbour * 2;
};
export default islandPerimeter;
