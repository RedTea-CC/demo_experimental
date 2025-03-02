/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let obj = {};
  nums.forEach((element) => {
    if (obj[element]) {
      obj[element]++;
    } else {
      obj[element] = 1;
    }
  });
  for (const key in obj) {
    if (obj[key] > nums.length / 2) {
      return Number(key);
    }
  }
};

// 排序
var majorityElement1 = function (nums) {
  nums.sort((a, b) => a - b);
  return nums[Math.floor(nums.length / 2)];
};

const nums = [3, 2, 3];
console.log(majorityElement1(nums));
