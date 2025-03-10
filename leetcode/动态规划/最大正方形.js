/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) return 0;

  const m = matrix.length;
  const n = matrix[0].length;

  // 创建dp数组，dp[i][j]表示以(i,j)为右下角的最大正方形边长
  const dp = Array(m).fill().map(() => Array(n).fill(0));

  let maxSide = 0; // 记录最大边长

  // 初始化第一行和第一列
  for (let i = 0; i < m; i++) {
    dp[i][0] = matrix[i][0] === '1' ? 1 : 0;
    maxSide = Math.max(maxSide, dp[i][0]);
  }

  for (let j = 0; j < n; j++) {
    dp[0][j] = matrix[0][j] === '1' ? 1 : 0;
    maxSide = Math.max(maxSide, dp[0][j]);
  }

  // 填充dp数组
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === '1') {
        // 当前格子为1时，取左、上、左上三个位置的最小值 + 1
        dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1;
        maxSide = Math.max(maxSide, dp[i][j]);
      }
    }
  }

  return maxSide * maxSide; // 返回面积
};

const matrix = [
  ["1", "0", "1", "0", "0"],
  ["1", "0", "1", "1", "1"],
  ["1", "1", "1", "1", "1"],
  ["1", "0", "0", "1", "0"],
];

console.log(maximalSquare(matrix));
