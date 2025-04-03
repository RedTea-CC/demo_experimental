// 函数柯里化

function currying(fn, ...args) {
  return args.length >= fn.length ? fn(...args) : currying.bind(null, fn, ...args);
}

const sum = (a, b, c, d) => a + b + c + d;

console.log(currying(sum)(1)(2)(3)(4)); // 10
