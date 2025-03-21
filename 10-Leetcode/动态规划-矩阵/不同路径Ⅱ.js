/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  if (obstacleGrid[0][0] === 1) return 0;
  const m = obstacleGrid.length,
    n = obstacleGrid[0].length;

  const f = new Array(m).fill(0).map(() => new Array(n).fill(0));
  f[0][0] = 1;

  for (let i = 1; i < m; i++) {
    if (obstacleGrid[i][0] === 1) break;
    f[i][0] = 1;
  }
  for (let j = 1; j < n; j++) {
    if (obstacleGrid[0][j] === 1) break;
    f[0][j] = 1;
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) continue;
      f[i][j] = f[i - 1][j] + f[i][j - 1];
    }
  }

  return f[m - 1][n - 1];
};

const obstacleGrid = [[1, 0]];

console.log(uniquePathsWithObstacles(obstacleGrid));
