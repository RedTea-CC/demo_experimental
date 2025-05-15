// ------组合函数

function compose(...fns) {
  return (...values) => {
    return fns.reduceRight((acc, fn) => fn(acc), values[0]);
  };
}

var add1 = (x) => Number(x) + 1;
var mul5 = (x) => Number(x) * 5;
console.log(compose(mul5, add1)(2)); // =>15

// ------函数柯里化

function curry(fn, ...args) {
  if (fn.length <= args.length) {
    return fn(...args);
  }
  return curry.bind(null, fn, ...args);
}

const sum = curry((a, b, c, d) => a + b + c + d);

console.log(sum(1)(2)(3)(4)); // 10
console.log(sum(1, 2, 3, 4)); // 10

// ------end
