/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  nums1.splice(m, nums1.length - m);
  nums2.splice(n, nums2.length - n);

  let index1 = 0;
  let index2 = 0;
  while (index1 < m && index2 < n) {
    if (nums1[index1] > nums2[index2]) {
      nums1.splice(index1, 0, nums2[index2]);
      index1++;
      index2++;
      m++;
    } else {
      index1++;
    }
  }

  if (index2 < n) {
    nums1.splice(index1, 0, ...nums2.slice(index2));
  }
};

let nums1 = [1, 2, 3, 0, 0, 0];
let m = 3;
let nums2 = [2, 5, 6];
let n = 3;
merge(nums1, m, nums2, n);
console.log(nums1);
// console.log(merge([1], 1, [], 0));
// console.log(merge([0], 0, [1], 1));
