/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function (nums) {
  // 先生成一个sum数组，记录删除对应点数获得的最大点数
  const maxValue = Math.max(...nums);
  // 1 <= nums[i] <= 104,sum最小长度为2
  const sum = new Array(maxValue + 1).fill(0);

  for (const value of nums) {
    sum[value] += value;
  }
  console.log(sum);
  // 动态规划：类似打家劫舍，取消耗最大
  return _rob(sum);
};

function _rob(nums) {
  const n = nums.length;
  if (n == 0) return 0;
  if (n == 1) return nums[0];

  let db = new Array(n + 1).fill(0);
  db = [0, nums[0]];

  for (let i = 2; i <= n; i++) {
    db[i] = Math.max(db[i - 1], db[i - 2] + nums[i - 1]);
  }
  return db[n];
}

// 第二种
const rob = (nums) => {
  const size = nums.length;
  let first = nums[0],
    second = Math.max(nums[0], nums[1]);

  for (let i = 2; i < size; i++) {
    let temp = second;
    second = Math.max(first + nums[i], second);
    first = temp;
  }
  return second;
};

const nums = [3, 4, 2];
console.log(deleteAndEarn(nums));
