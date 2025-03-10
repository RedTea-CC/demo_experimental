/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n == 1) return 1;
  if (n == 2) return 2;

  return climbStairs(n - 1) + climbStairs(n - 2);
};
var climbStairs1 = function (n) {
  let p = 0,
    q = 0,
    r = 1;

  for (let i = 1; i <= n; i++) {
    // [p, q, r] = [q, r, q + r];
    p = q;
    q = r;
    r = p + q;
  }
  return r;
};

console.log(climbStairs1(44));
