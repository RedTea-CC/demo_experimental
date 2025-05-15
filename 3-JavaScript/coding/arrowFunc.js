let obj = {
  name: "obj",
  method() {
    console.log(`hi,${this.name}`);
  },
  arrow: () => {
    console.log(`hi,${this?.name}`);
  },
};

obj.method();
// 箭头函数的 `this` 是从定义的上下文中继承的，而不是从调用时的上下文中继承
obj.arrow();
