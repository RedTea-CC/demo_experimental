/**
 * @param {number[]} prices
 * @return {number}
 */
// 每次都假设是今天卖出，然后求今天之前的历史最低点。而这个历史最低点并不需要额外遍历，而是每天考虑的时候顺带记录的。因此时间复杂度是O(N)
var maxProfit = function (prices) {
  const n = prices.length;
  let min = prices[0];
  let cost = 0;

  for (let i = 1; i < n; i++) {
    const dayCost = prices[i] - min;
    cost = Math.max(cost, dayCost);

    min = Math.min(min, prices[i]);
  }
  return cost;
};

var maxProfit1 = function (prices) {
  const n = prices.length;
  let cost = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      if (prices[i] < prices[j]) {
        cost = Math.max(prices[j] - prices[i], cost);
      }
    }
  }
  return cost;
};

const prices = [3, 2, 6, 5, 0, 3];

console.log(maxProfit(prices));
