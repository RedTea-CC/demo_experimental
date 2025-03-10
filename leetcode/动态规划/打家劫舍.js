/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const n = nums.length;
  if (n == 0) return 0;
  if (n == 1) return nums[0];

  // 边界问题
  let db = new Array(n + 1).fill(0);
  db = [0, nums[0]];
  console.log(db);
  for (let i = 2; i <= n; i++) {
    /* 由于不可以在相邻的房屋闯入，所以在当前位置 n 房屋可盗窃的最大值，
    要么就是 n-1 房屋可盗窃的最大值，要么就是 n-2 房屋可盗窃的最大值加上当前房屋的值，
    二者之间取最大值 */
    db[i] = Math.max(db[i - 1], db[i - 2] + nums[i - 1]);
    // dp的i代表当前房子，nums的i-1代表当前房子
  }
  return db[n];
};

const cost = [1, 2];
console.log(rob(cost));
