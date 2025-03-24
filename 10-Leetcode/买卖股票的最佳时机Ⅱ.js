/**
 * @param {number[]} prices
 * @return {number}
 */
// 动态规划
var maxProfit = function (prices) {
  const n = prices.length;
  let profit = 0;
};

// 贪心
var maxProfit2 = function (prices) {
  const n = prices.length;
  let profit = 0;

  for (let i = 1; i < n; i++) {
    profit += Math.max(0, prices[i] - prices[i - 1]);
  }
  return profit;
};

// 递归
var maxProfit1 = function (prices) {
  const n = prices.length;
  let min = prices[0];
  let allCost = 0;

  for (let i = 1; i < n; i++) {
    const dayCost = prices[i] - min;
    let cost = 0;

    min = Math.min(min, prices[i]);

    // 假设i时卖出，后面重新计算
    if (dayCost > cost) {
      cost = dayCost;
      cost += maxProfit(prices.slice(i + 1));
    }
    allCost = Math.max(allCost, cost);
  }
  return allCost;
};

// const prices = [7, 1, 5, 3, 6, 4];
const prices = [6, 1, 3, 2, 4, 7];
// const prices = [2, 1, 4, 5, 2, 9, 7];

console.log(maxProfit(prices));
