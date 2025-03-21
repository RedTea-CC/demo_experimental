/**
 * 静态属性 静态方法 静态块
 */
class Static {
  static name = "static";
  static getName() {
    return Static.name;
  }
  static {
    console.log("static block", Static.name);
  }
}

console.log(Static.name); // static

const demoStatic = new Static();

// 静态属性只存在于类上，实例无法调用
console.log(demoStatic.name); // undefined

// 静态方法只存在于类上，实例无法调用,实例调用会报错
// console.log(demoStatic.getName()); // TypeError: demoStatic.getName is not a function

// ------------------静态块处理异步操作------------------

// 立即执行异步函数（IIFE）
class StaticBlock {
  static name = "static";
  static {
    (async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          StaticBlock.name = "static block";
          console.log("异步操作", StaticBlock.name);
          resolve();
        }, 1000);
      });
    })();
  }
}

// 在类外部处理异步逻辑
