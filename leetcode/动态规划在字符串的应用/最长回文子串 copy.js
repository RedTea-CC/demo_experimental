/**
 * 给你一个字符串 s，找到 s 中最长的 回文 子串。
 *
 * @param {string} s
 * @return {string}
 */
var longestPalindromeSubstring = function (s) {
  if (!s || s.length < 1) return "";
  /* 创建一个二维dp数组，dp[i][j]表示字符串s从索引i到j的子串是否为回文串
    初始化所有长度为1的子串为回文串（dp[i][i] = true）
    对于长度为2的子串，如果两个字符相同则为回文串
    对于长度大于2的子串，如果s[i] == s[j]且dp[i+1][j-1]为回文串，则dp[i][j]为回文串
    在遍历过程中记录最长回文子串的起始位置和长度
    最后返回最长回文子串 */

  // 初始化变量
  const n = s.length;
  let start = 0; // 最长回文子串的起始位置
  let maxLength = 1; // 最长回文子串的长度

  // 创建dp数组：dp[i][j]表示字符串s从索引i到j的子串是否为回文串
  const dp = Array(n)
    .fill()
    .map(() => Array(n).fill(false));

  // 所有单个字符都是回文
  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
  }

  // 检查长度为2的子串
  for (let i = 0; i < n - 1; i++) {
    if (s[i] === s[i + 1]) {
      dp[i][i + 1] = true;
      start = i;
      maxLength = 2;
    }
  }

  // 检查长度大于2的子串
  for (let len = 3; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      // 子串的右端点j
      const j = i + len - 1;

      // 如果首尾字符相同，并且中间部分是回文，则整个子串是回文
      if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;

        if (len > maxLength) {
          start = i;
          maxLength = len;
        }
      }
    }
  }

  return s.substring(start, start + maxLength);
};

const s = "bbbab";
console.log("最长回文子串:", longestPalindromeSubstring(s)); // "bbb"

/**
 * 对比分析：
 *
 * 1. 状态定义不同：
 *    - 子序列DP：dp[i][j]表示长度（数值）
 *    - 子串DP：dp[i][j]表示是否为回文（布尔值）
 *
 * 2. 状态转移方程不同：
 *    - 子序列：可以跳过字符，所以有Math.max(dp[i+1][j], dp[i][j-1])的情况
 *    - 子串：必须连续，所以只考虑s[i]===s[j]且内部也是回文的情况
 *
 * 3. 结果记录方式不同：
 *    - 子序列：直接返回dp[0][n-1]的值
 *    - 子串：需要记录最长回文子串的起始位置和长度
 */
