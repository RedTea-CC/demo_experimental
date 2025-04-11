// 有字符串 var = 'abc345efgabcab'，请写出 3 条 JS 语句分别实现如下 3 个功能（使用正则）：
// 1）去掉字符串中的a、b、c 字符，形成结果：'345efg'
// 2）将字符串中的数字用中括号括起来，形成结果：'abc[345]efgabcab'
// 3）将字符串中的每个数字的值分别乘以 2，形成结果：'abc6810efgabcab'

var string = "abc345efgabcab";
let a = string.replace(/\a|b|c/g, "");
let b = string.replace(/\d+/g, (match) => "[" + match + "]");
let c = string.replace(/\d/g, (match) => match * 2);

console.log(a);
console.log(b);
console.log(c);
