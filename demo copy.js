globalThis.name = "golbal-name";

let obj = {
  name: "123",
  sayHi: () => {
    // 这里的 this 是 window
    // 箭头函数中的 this 是定义时的 this
    console.log(`hi,${this?.name}`);
  },
  sayHi2: function () {
    console.log(`2hi,${this?.name}`);
  },
  sayHi3() {
    console.log(`3hi,${this?.name}`);
  },
};

// 箭头函数中的 this 是定义时的 this
// 普通函数中的 this 是调用时的 this
obj.sayHi();
obj.sayHi2();
obj.sayHi3();
