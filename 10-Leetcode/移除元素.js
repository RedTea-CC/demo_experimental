/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let newArray = nums.filter((item) => item !== val);
  nums.splice(0, nums.length, ...newArray);
  console.log(nums);
  return nums.length;
};
var removeElement1 = function (nums, val) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) {
      nums.splice(i, 1);
      i--;
    }
  }
  console.log(nums);
  return nums.length;
};

// 输入：nums = [3,2,2,3], val = 3
// 输出：2, nums = [2,2,_,_]

console.log(removeElement([3, 2, 2, 3], 3));
console.log(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2));
