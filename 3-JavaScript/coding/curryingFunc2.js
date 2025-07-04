// 函数柯里化 (Function Currying)

/**
 * 柯里化是一种将接受多个参数的函数转换成一系列只接受一个参数的函数的技巧。
 * 其核心作用包括：
 * 1. 参数复用：多次调用时可以复用部分已传入的参数。
 * 2. 提前返回：当参数满足条件时，可以提前执行并返回结果。
 * 3. 延迟执行：在所有参数都收集完毕之前，函数不会真正执行。
 *
 * @param {Function} fn - 需要被柯里化的目标函数。
 * @param {...any} args - 已经传入的参数。
 * @returns {Function|any} 如果参数不足以执行目标函数，则返回一个新的柯里化函数；否则，返回目标函数的执行结果。
 */
function currying(fn, ...args) {
  // 参数足够则执行当前函数；如果不够，则返回一个函数收集参数。
  return fn.length <= args.length ? fn(...args) : currying.bind(null, fn, ...args);
}

// 示例用法：定义一个接收四个参数的求和函数，并对其进行柯里化。
const sum = currying((a, b, c, d) => a + b + c + d);

console.log(sum(1)(2)(3)(4)); // 10
console.log(sum(1, 2, 3, 4)); // 10
