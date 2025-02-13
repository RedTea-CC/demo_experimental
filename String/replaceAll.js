// Description: 实现 String.prototype.replaceAll() 方法

function replaceAll(str, search, replacement) {
  // 如果搜索模式是字符串，使用正则表达式进行全局匹配
  if (typeof search === "string") {
    return str.split(search).join(replacement);
  }
  // 如果搜索模式是正则表达式
  if (search instanceof RegExp) {
    // 确保正则表达式有全局标志（g），否则会进行单次替换
    const globalSearch = new RegExp(search.source, search.flags + "g");
    return str.replace(globalSearch, replacement);
  }
  // 其他情况返回原始字符串
  return str;
}

"a-b-c".replaceAll("-", "_"); // 输出 'a_b_c'
const text = "Hello, world! Hello again!";
console.log(replaceAll(text, "Hello", "Hi"));
// 输出: "Hi, world! Hi again!"
