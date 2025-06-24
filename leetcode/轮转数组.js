/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  const n = nums.length;
  const array = Array(n);
  for (let i = 0; i < n; i++) {
    array[(i + k) % n] = nums[i];
  }
  for (let i = 0; i < n; i++) {
    nums[i] = array[i];
  }
};

const nums = [1, 2, 3, 4, 5, 6, 7],
  k = 3;
console.log(rotate(nums, k));
console.log(nums);
