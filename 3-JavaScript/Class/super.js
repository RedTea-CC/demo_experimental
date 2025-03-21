class Parent {
  sayHello() {
    console.log("Hello from Parent!");
  }
}

class Child extends Parent {
  sayHello() {
    // 调用父类的同名方法
    super.sayHello();

    // 子类的其他逻辑
    console.log("Hello from Child!");
  }
}

const child = new Child();
child.sayHello();
// 输出:
// Hello from Parent!
// Hello from Child!