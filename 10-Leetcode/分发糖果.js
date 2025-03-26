/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
  const n = ratings.length;
  let candy = new Array(n).fill(1);

  // 从左往右
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candy[i] = candy[i - 1] + 1;
    }
  }
  // 从右往左
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      const temp = Math.max(candy[i + 1] + 1, candy[i]);
      candy[i] = temp;
    }
  }

  return candy.reduce((a, b) => a + b);
};

const ratings = [1, 0, 2];
console.log("candy:", candy(ratings));
