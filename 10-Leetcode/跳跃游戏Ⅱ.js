/**
 * @param {number[]} nums
 * @return {boolean}
 */
var jump = function (nums) {
  const n = nums.length;

  let deep = 0,
    maxIndex = 0,
    end = 0;

  for (let i = 0; i < n - 1; i++) {
    if (i <= maxIndex) {
      maxIndex = Math.max(maxIndex, i + nums[i]);
      // 到达边界
      if (i === end) {
        deep++;
        end = maxIndex;
      }
    }
  }
  return deep;
};

const nums = [2, 3, 1, 1, 4];
// const nums = [3, 2, 1, 0, 4];
// const nums = [1, 2];`
// const nums = [0];
// const nums = [7, 0, 9, 6, 9, 6, 1, 7, 9, 0, 1, 2, 9, 0, 3];

console.log(jump(nums));
