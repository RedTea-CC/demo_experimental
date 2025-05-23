// 函数柯里化

// 柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技服
// 柯里化的主要作用是参数复用、提前返回和延迟执行
function currying(fn, ...args) {
  console.log("目标函数的参数个数:", fn.length, "当前已经传入的参数个数:", args.length);
  // 参数足够则执行当前函数；如果不够，则返回一个函数收集参数。
  return fn.length <= args.length ? fn(...args) : currying.bind(null, fn, ...args);
}

// 拆分函数和收集参数
const sum = currying((a, b, c, d) => a + b + c + d);

console.log(sum(1)(2)(3)(4)); // 10
console.log(sum(1, 2, 3, 4)); // 10
