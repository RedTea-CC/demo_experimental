Function.prototype.myCall = function (context, ...args) {
  // 当 context 为 null 或 undefined 时，默认为全局对象（浏览器中是 window，Node.js 中是 global）
  context = context || globalThis;
  // 使用 Symbol 生成一个独一无二的属性名，避免与 context 上已有属性冲突
  const fnSymbol = Symbol();
  // 将当前函数（即 this）作为 context 的一个方法
  context[fnSymbol] = this;
  // 以 context 为 this 执行该函数，并传入参数
  const result = context[fnSymbol](...args);
  // 删除临时添加的属性
  delete context[fnSymbol];
  return result;
};

Function.prototype.myApply = function (context, args = []) {
  context = context || globalThis;
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  // 如果传入的 args 是一个数组，则展开数组传参；否则直接调用
  const result = Array.isArray(args)
    ? context[fnSymbol](...args)
    : context[fnSymbol]();
  delete context[fnSymbol];
  return result;
};

Function.prototype.myBind = function (context, ...args) {
  // 保存原函数引用
  const self = this;

  // 返回一个新函数
  function fBound(...moreArgs) {
    // 如果 fBound 被当作构造函数调用，则此时 this 指向新实例，忽略传入的 context
    // 否则，使用绑定的 context
    return self.apply(
      this instanceof fBound ? this : context,
      args.concat(moreArgs)
    );
  }

  // 继承原函数的原型，这样使用 new fBound() 创建的实例，其原型链上能找到原函数原型上的属性和方法
  fBound.prototype = Object.create(self.prototype);
  return fBound;
};

// --------------------- 测试 --------------------------------

// 用原生ES5实现bind函数
Function.prototype.bind = function (context) {
  // 确保调用 bind 的是一个函数
  if (typeof this !== "function") {
    throw new TypeError(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }

  // 保存原函数
  var self = this;

  // 获取 bind 时传入的额外参数（除了第一个参数 context）
  var args = Array.prototype.slice.call(arguments, 1);

  // 创建一个空函数作为中介，避免直接修改原函数的 prototype
  var fNOP = function () {};

  // 返回的新函数
  var fBound = function () {
    // 获取调用新函数时传入的参数
    var bindArgs = Array.prototype.slice.call(arguments);

    // 判断是否是作为构造函数调用（通过 new 调用）
    // 如果是构造函数调用，this 指向新创建的对象，否则指向 context
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    );
  };

  // 维护原型关系
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();

  return fBound;
};
