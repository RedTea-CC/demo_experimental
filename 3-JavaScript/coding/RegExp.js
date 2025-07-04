// 有字符串 var = 'abc345efgabcab'，请写出 3 条 JS 语句分别实现如下 3 个功能（使用正则）：
// 1）去掉字符串中的a、b、c 字符，形成结果：'345efg'
// 2）将字符串中的数字用中括号括起来，形成结果：'abc[345]efgabcab'
// 3）将字符串中的每个数字的值分别乘以 2，形成结果：'abc6810efgabcab'

// 正则表达式操作 (Regular Expression Operations)

// 定义一个示例字符串用于演示正则表达式操作。
const originalString = 'abc345efgabcab';

/**
 * 功能 1: 去掉字符串中的 'a'、'b'、'c' 字符。
 * 使用正则表达式 /a|b|c/g 全局匹配 'a'、'b' 或 'c'，并替换为空字符串。
 */
const stringWithoutAbc = originalString.replace(/a|b|c/g, '');
// 预期结果: '345efg'

/**
 * 功能 2: 将字符串中的连续数字用中括号括起来。
 * 使用正则表达式 /\d+/g 全局匹配一个或多个数字。
 * 替换函数会将匹配到的数字前后加上中括号。
 */
const numbersInBrackets = originalString.replace(/\d+/g, (match) => `[${match}]`);
// 预期结果: 'abc[345]efgabcab'

/**
 * 功能 3: 将字符串中的每个数字的值分别乘以 2。
 * 使用正则表达式 /\d/g 全局匹配每一个数字。
 * 替换函数会将匹配到的数字转换为数值并乘以 2，再转换回字符串。
 */
const doubledDigits = originalString.replace(/\d/g, (match) => (parseInt(match, 10) * 2).toString());
// 预期结果: 'abc6810efgabcab'

// 示例：可以打印这些结果来验证
// console.log('原字符串:', originalString);
// console.log('功能 1 结果:', stringWithoutAbc);
// console.log('功能 2 结果:', numbersInBrackets);
// console.log('功能 3 结果:', doubledDigits);
