/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  // [0,0] ---> [m-1,n-1]
  // fn(m,n) = fn(m-1,n) + fn(m,n-1)
  const f = new Array(m).fill(0).map(() => new Array(n).fill(0));

  for (let i = 0; i < m; i++) {
    f[i][0] = 1;
  }
  for (let j = 1; j < n; j++) {
    f[0][j] = 1;
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      f[i][j] = f[i - 1][j] + f[i][j - 1];
    }
  }

  return f[m - 1][n - 1];
};

const m = 3;
const n = 7;

console.log(uniquePaths(m, n));
