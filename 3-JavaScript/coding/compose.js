// 函数组合
function compose(...fns) {
  return (...values) => {
    return fns.reduceRight((acc, fn) => fn(acc), values[0]); // 使用 values[0] 作为初始值
  };
}

var add1 = (x) => Number(x) + 1;
var mul5 = (x) => Number(x) * 5;
console.log(compose(mul5, add1)(2)); // =>15
