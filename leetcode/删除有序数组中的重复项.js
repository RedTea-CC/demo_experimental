/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let array = [];
  nums.forEach((num) => {
    if (array.indexOf(num) == -1) {
      array.push(num);
    }
  });
  nums.splice(0, nums.length, ...array);
  console.log(nums);
  return array.length;
};

// 双指针
var removeDuplicates1 = function (nums) {
  let length = nums.length;
  if (length <= 1) {
    return length;
  }
  let slow = 1;
  let fast = 1;

  while (fast < length) {
    if (nums[fast] !== nums[fast - 1]) {
      nums[slow] = nums[fast];
      slow++;
    }
    fast++;
  }
  console.log(nums);
  return slow;
};

// 双指针
var removeDuplicates2 = function (nums) {
  let length = nums.length;
  if (length <= 1) return length;
  let slow = 1;
  let fast = 1;

  while (fast < length) {
    if (nums[fast] !== nums[slow - 1]) {
      nums[slow] = nums[fast];
      slow++;
    }
    fast++;
  }
  console.log(nums);
  return slow;
};

let nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];

console.log(removeDuplicates1(nums));
