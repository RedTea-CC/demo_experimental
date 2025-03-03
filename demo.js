let a = [1, 2, 3].reduce((acc, item, index) => {
  return item + acc;
}, "");

console.log(a);

/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let number1 = l1.reduce((acc, item, index) => {
    return item + acc;
  }, "");
  let number2 = l2.reduce((acc, item, index) => {
    return item + acc;
  }, "");
  let result = Number(number1) + Number(number2);
  return String(result).split("").map(Number).reverse();
};
// @lc code=end

// 输入：l1 = [2,4,3], l2 = [5,6,4]
// 输出：[7,0,8]
// 解释：342 + 465 = 807.
console.log(addTwoNumbers([2, 4, 3], [5, 6, 4]));
