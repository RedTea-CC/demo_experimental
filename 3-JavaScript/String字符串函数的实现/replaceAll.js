// Description: 实现 String.prototype.replaceAll() 方法

// 自定义字符串全局替换函数 (Custom String ReplaceAll Function)

/**
 * 模拟 `String.prototype.replaceAll()` 方法，用于全局替换字符串中所有匹配的子字符串或正则表达式。
 * 它支持两种 `search` 类型：字符串和正则表达式。
 *
 * @param {string} str - 原始字符串，即要进行替换操作的字符串。
 * @param {string | RegExp} search - 要查找并替换的子字符串或正则表达式。
 *   - 如果是字符串，将替换所有匹配的字符串。
 *   - 如果是正则表达式，将替换所有匹配的模式。如果正则表达式没有全局 (`g`) 标志，函数会创建一个新的带 `g` 标志的正则表达式。
 * @param {string} replacement - 用于替换 `search` 的字符串。
 * @returns {string} 替换后的新字符串。如果 `search` 未找到，则返回原始字符串。
 * @example
 * // 示例 1: 字符串替换
 * console.log(customReplaceAll('banana', 'a', 'o')); // "bonono"
 * console.log(customReplaceAll('apple pie apple', 'apple', 'orange')); // "orange pie orange"
 *
 * @example
 * // 示例 2: 正则表达式替换
 * const text1 = "Hello, world! Hello again!";
 * console.log(customReplaceAll(text1, /Hello/g, "Hi")); // "Hi, world! Hi again!"
 *
 * // 如果正则表达式没有全局标志，函数会添加它
 * const text2 = "one two one three";
 * console.log(customReplaceAll(text2, /one/, "four")); // "four two four three"
 */
function customReplaceAll(str, search, replacement) {
  // 确保原始字符串是字符串类型
  if (typeof str !== 'string') {
    return String(str); // 尝试转换为字符串或根据需要抛出错误
  }
  // 确保 replacement 是字符串类型
  if (typeof replacement !== 'string') {
    replacement = String(replacement); // 尝试转换为字符串
  }

  // 如果搜索模式是字符串，使用 split 和 join 实现全局替换
  if (typeof search === "string") {
    return str.split(search).join(replacement);
  }
  // 如果搜索模式是正则表达式
  if (search instanceof RegExp) {
    // 确保正则表达式有全局标志（g）。
    // 如果没有，创建一个新的正则表达式，并添加 'g' 标志。
    const globalSearch = search.global
      ? search
      : new RegExp(search.source, search.flags + "g");
    return str.replace(globalSearch, replacement);
  }

  // 如果 search 参数类型不支持，返回原始字符串
  return str;
}

"a-b-c".replaceAll("-", "_"); // 输出 'a_b_c'
const text = "Hello, world! Hello again!";
console.log(customReplaceAll(text, "Hello", "Hi"));
// 输出: "Hi, world! Hi again!"

// 为了使其可以在其他文件中导入和使用
// module.exports = customReplaceAll;
