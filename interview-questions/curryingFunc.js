// 函数柯里化

// 柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技服
// 柯里化的主要作用是参数复用、提前返回和延迟执行
function currying(fn, ...args) {
  //   console.log("fn:", fn.length, "args:", args.length);
  return fn.length <= args.length ? fn(...args) : currying.bind(null, fn, ...args);
}

const sum = (a, b, c, d) => a + b + c + d;

console.log(currying(sum)(1)(2)(3)(4)); // 10
console.log(currying(sum)(1, 2)(3)(4)); // 10
console.log(currying(sum, 1, 2)(3)(4)); // 10
console.log(currying(sum, 1, 2)(3, 4)); // 10
console.log(currying(sum, 1, 2, 3, 4)); // 10
