/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  const f = new Array(m).fill(0).map(() => new Array(n).fill(0));
  f[0][0] = grid[0][0];
  for (let i = 1; i < m; i++) {
    f[i][0] = f[i - 1][0] + grid[i][0];
  }
  for (let j = 1; j < n; j++) {
    f[0][j] = f[0][j - 1] + grid[0][j];
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      f[i][j] = Math.min(f[i - 1][j], f[i][j - 1]) + grid[i][j];
    }
  }
  console.log(f);
  return f[m - 1][n - 1];
};

const grid = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
];

console.log(minPathSum(grid));
