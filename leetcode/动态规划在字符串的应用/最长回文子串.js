/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (s.length < 2) {
    return s;
  }
  let l = 0;
  let r = 0;
  // 遍历每个字符，以当前字符为中心，向两边扩展
  for (let i = 0; i < s.length; i++) {
    // 回文子串长度是奇数
    expand(i, i);
    // 回文子串长度是偶数
    expand(i, i + 1);
  }
  function expand(left, right) {
    // 从中心向两边扩展
    while (left >= 0 && right < s.length && s[left] == s[right]) {
      left--;
      right++;
    }
    // 注意此处m,n的值循环完后  是恰好不满足循环条件的时刻
    // 此时m到n的距离为n-m+1，但是mn两个边界不能取 所以应该取m+1到n-1的区间  长度是n-m-1
    if (right - left - 1 > r - l) {
      l = left + 1;
      r = right - 1;
    }
  }
  return s.slice(l, r + 1);
};

// var longestPalindrome = function (s) {
//   if (s < 2) return s;
//   let res = "";
//   const len = s.length;
//   for (let i = 0; i < len; i++) {
//     if (res.length === len) break;
//     walk(i, i);
//     if (s[i] === s[i + 1]) {
//       walk(i, i + 1);
//     }
//   }
//   function walk(l, r) {
//     while (l >= 0 && r < len && s[l] === s[r]) {
//       l--;
//       r++;
//     }
//     if (r - l - 1 > res.length) {
//       res = s.slice(l + 1, r);
//     }
//   }
//   return res;
// };

// a = ["eabcb", "babad", "cbbd", "ac", "aaaa", "bacab", "aacabdkacaa"];
a = ["abb"];
a.forEach((s) => {
  console.log("result", longestPalindrome(s));
});
