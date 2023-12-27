class Parent {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello, ${this.name}!`);
  }
}

class Child extends Parent {
  constructor(name, age) {
    // 调用父类的构造函数
    super(name);

    // 子类的其他初始化工作
    this.age = age;
  }
}

const child = new Child("John", 25);
child.sayHello(); // 输出: Hello, John!
