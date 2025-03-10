/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  const n = triangle.length;
  if (n === 0) return 0;
  if (n === 1) return triangle[0][0];

  // 使用一维数组存储，初始化为最后一行
  const dp = [...triangle[n - 1]];

  // 从倒数第二行开始向上计算
  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      // 状态转移：当前位置的最小路径和 = 当前值 + 下一行相邻两个位置的最小值
      dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1]);
    }
  }

  return dp[0];
};

var minimumTotal1 = function (triangle) {
  const n = triangle.length;
  if (n === 0) return 0;
  if (n === 1) return triangle[0][0];

  const f = new Array(n).fill(0).map(() => new Array(n).fill(0));
  f[0][0] = triangle[0][0];

  for (let i = 1; i < n; i++) {
    f[i][0] = f[i - 1][0] + triangle[i][0];
    for (let j = 1; j < i; j++) {
      f[i][j] = Math.min(f[i - 1][j - 1], f[i - 1][j]) + triangle[i][j];
    }
    f[i][i] = f[i - 1][i - 1] + triangle[i][i];
  }
  return Math.min(...f[n - 1]);
};

const triangle = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]];

console.log(minimumTotal(triangle));
