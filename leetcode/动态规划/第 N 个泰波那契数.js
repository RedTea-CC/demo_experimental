/**
 * @param {number} n
 * @return {number}
 */
var nFib = function (n) {
  if (n == 0) return 0;
  if (n == 1) return 1;
  if (n == 2) return 1;
  return nFib(n - 1) + nFib(n - 2) + nFib(n - 3);
};

var nFib1 = function (n) {
  if (n == 0) return 0;
  if (n == 1) return 1;
  if (n == 2) return 1;

  let db = [0, 1, 1];
  for (let i = 3; i <= n; i++) {
    db[i] = db[i - 1] + db[i - 2] + db[i - 3];
  }
  return db[n];
};

console.log(nFib1(4));
