// 自定义字符串替换函数 (Custom String Replace Function)

/**
 * 模拟 `String.prototype.replace()` 方法，但仅替换字符串中第一次出现的指定子字符串。
 * 如果需要全局替换或使用正则表达式，请参考 `replaceAll` 函数或原生的 `String.prototype.replace()` 方法。
 *
 * @param {string} originalString - 原始字符串，即要进行替换操作的字符串。
 * @param {string} searchValue - 要查找并替换的子字符串。
 * @param {string} replaceValue - 用于替换 `searchValue` 的字符串。
 * @returns {string} 替换后的新字符串。如果 `searchValue` 未找到，则返回原始字符串。
 * @example
 * console.log(customReplace('Hello World', 'World', 'JavaScript')); // "Hello JavaScript"
 * console.log(customReplace('banana', 'a', 'o')); // "bonana" (只替换第一个 'a')
 * console.log(customReplace('test', 'xyz', 'abc')); // "test" (未找到，返回原字符串)
 */
function customReplace(originalString, searchValue, replaceValue) {
  // 确保输入是字符串类型，并处理空字符串或非字符串输入
  if (typeof originalString !== 'string' || typeof searchValue !== 'string' || typeof replaceValue !== 'string') {
    // 或者抛出错误，具体取决于期望的行为
    return String(originalString);
  }

  const index = originalString.indexOf(searchValue);

  // 如果找不到 searchValue，则返回原始字符串
  if (index === -1) {
    return originalString;
  }

  // 构造新字符串：searchValue 之前的部分 + replaceValue + searchValue 之后的部分
  return originalString.substring(0, index) +
         replaceValue +
         originalString.substring(index + searchValue.length);
}

// 为了使其可以在其他文件中导入和使用
// module.exports = customReplace;