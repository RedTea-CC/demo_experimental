// setImmediate 和 setTimeout 执行顺序

setTimeout(() => {
  console.log("setTimeout");
}, 0);
// 写的0s实际上会有延迟0.4s

setImmediate(() => {
  console.log("setImmediate");
});

// setImmediate
// setTimeout
