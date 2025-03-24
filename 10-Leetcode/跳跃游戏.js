/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  const n = nums.length;
  let maxIndex = nums[0];
  for (let i = 1; i < n; i++) {
    if (i <= maxIndex) {
      maxIndex = Math.max(i + nums[i], maxIndex);
    }
  }
  if (n - 1 <= maxIndex) return true;
  return false;
};

// const nums = [2, 3, 1, 1, 4];
// const nums = [3, 2, 1, 0, 4];
const nums = [0];

console.log(canJump(nums));
