function sum(...args) {
  let total = args.reduce((a, b) => a + b, 0);
  let l = args.length;
  const f = (...nextArgs) => {
    total += nextArgs.reduce((a, b) => a + b, 0);
    l += nextArgs.length;
    if (l === 3) {
      return total;
    }
    return f;
  };
  if (l === 3) {
    return total;
  }
  return f;
}

// 用法：
console.log("sim:", sum(1, 2, 3));
console.log("sim:", sum(1)(2)(3));
