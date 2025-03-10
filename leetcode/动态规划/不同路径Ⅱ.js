/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length,
    n = obstacleGrid[0].length;

  const f = new Array(m).fill(0).map(() => new Array(n).fill(0));

  for (let i = 0; i < m; i++) {
    if (obstacleGrid[i][0] === 1) {
      f[i][0] = 0;
      break;
    }
    f[i][0] = 1;
  }
  for (let j = 0; j < n; j++) {
    if (obstacleGrid[0][j] === 1) {
      f[0][j] = 0;
      break;
    }
    f[0][j] = 1;
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        f[i][j] = 0;
        continue;
      }
      f[i][j] = f[i - 1][j] + f[i][j - 1];
    }
  }

  return f[m - 1][n - 1];
};

const obstacleGrid = [[1, 0]];

console.log(uniquePathsWithObstacles(obstacleGrid));
