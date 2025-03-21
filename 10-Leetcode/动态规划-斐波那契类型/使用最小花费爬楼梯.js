/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  const n = cost.length;
  const db = [0, 0];
  for (let i = 2; i <= n; i++) {
    db[i] = Math.min(db[i - 1] + cost[i - 1], db[i - 2] + cost[i - 2]);
  }
  return db[n];
};

const cost = [10, 15, 20];
console.log(minCostClimbingStairs(cost));
