/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let map = new Map();
  let length = nums.length;

  for (let i = 0; i < length; i++) {
    const element = nums[i];
    let old = map.get(element) ?? 0;
    if (old >= 2) {
      nums.splice(i, 1);
      if (i >= nums.length) break;
      i--;
    }
    map.set(element, old + 1);
  }
  return nums.length;
};

// 双指针
var removeDuplicates1 = function (nums) {
  let length = nums.length;
  if (length <= 2) return length;
  let slow = 2,
    fast = 2;

  while (fast < length) {
    if (nums[fast] !== nums[slow - 2]) {
      nums[slow] = nums[fast];
      slow++;
    }
    fast++;
  }
  console.log(nums);
  return slow;
};

// nums = [1,1,1,2,2,3]
// 输出：5, nums = [1,1,2,2,3]
let nums = [1, 1, 1, 2, 2, 3];
// let nums = [0, 0, 0, 0, 0];

console.log(removeDuplicates1(nums));

// ---------------------------------

/**
 * 通用n项相同
 * @param {number[]} nums
 * @param {number} n
 * @return {number}
 */
var removeDuplicatesN = function (nums, n) {
  let length = nums.length;
  if (length <= n) return length;

  let slow = n;
  let fast = n;

  while (fast < length) {
    if (nums[fast] !== nums[slow - n]) {
      nums[slow] = nums[fast];
      slow++;
    }
    fast++;
  }
  console.log(nums.slice(0, slow));
  return slow;
};
