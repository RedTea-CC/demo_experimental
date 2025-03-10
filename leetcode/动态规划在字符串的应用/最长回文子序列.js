/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function (s) {
    const n = s.length;
    // 创建dp数组，初始化为0：dp[i][j]表示从索引i到j的子字符串中最长回文子序列的长度
    const dp = Array(n).fill().map(() => Array(n).fill(0));

    // 单个字符的回文序列长度为1
    for (let i = 0; i < n; i++) {
        dp[i][i] = 1;
    }

    // 从长度为2的子串开始填充dp表
    // 注意遍历顺序：长度从小到大，i从大到小（因为需要依赖dp[i+1][j-1]的结果）
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;
            // 如果首尾字符相同，则最长回文子序列长度 = 去掉首尾后的最长回文子序列长度 + 2
            if (s[i] === s[j]) {
                dp[i][j] = (len === 2) ? 2 : dp[i+1][j-1] + 2;
            } else {
                // 否则，取去掉头或去掉尾的最大值
                dp[i][j] = Math.max(dp[i+1][j], dp[i][j-1]);
            }
        }
    }

    // 返回整个字符串的最长回文子序列长度
    return dp[0][n-1];
};

const s = "bbbab";
console.log("result", longestPalindromeSubseq(s));

// 添加在文件末尾的注释说明
/**
 * 最长回文子序列与最长回文子串的区别：
 *
 * 1. 概念区别：
 *    - 回文子序列：可以不连续，如"bbbab"的最长回文子序列是"bbbb"，长度为4
 *    - 回文子串：必须连续，如"bbbab"的最长回文子串是"bbb"，长度为3
 *
 * 2. 实现区别：
 *    - 子序列：dp[i][j]表示s[i...j]的最长回文子序列长度
 *      当s[i] === s[j]时，dp[i][j] = dp[i+1][j-1] + 2
 *      当s[i] !== s[j]时，dp[i][j] = Math.max(dp[i+1][j], dp[i][j-1])
 *
 *    - 子串：dp[i][j]表示s[i...j]是否为回文串
 *      当s[i] === s[j]时，dp[i][j] = dp[i+1][j-1]（需要内部也是回文）
 *      当s[i] !== s[j]时，dp[i][j] = false
 *
 * 3. 实现注意事项：
 *    - 子序列：遍历顺序很重要，需要保证计算dp[i][j]时已经计算出dp[i+1][j-1]
 *    - 子串：通常需要记录最长回文子串的起始位置和长度
 */
