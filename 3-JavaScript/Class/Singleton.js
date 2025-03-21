// ------------------单例模式------------------
class Singleton {
  // 静态属性不能通过实例访问，只能通过类访问
  static #instance;
  a = 1;

  static {
    this.#instance = new Singleton();
  }

  constructor() {
    if (Singleton.#instance) {
      return Singleton.#instance;
    }
    Singleton.#instance = this;
  }

  // 静态方法中的this指向类本身，而不是实例。
  static getInstance() {
    return this.#instance;
  }

  getCustom() {
    console.log("自定义属性");
  }
}

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // true

// 类的方法都在原型上,不会被复制;属性在实例上,会被复制
console.log(instance1);

// ------------------单例模式简化------------------

class Singleton1 {
  static instance;

  constructor() {
    if (Singleton1.instance) {
      return Singleton1.instance;
    }
    Singleton.instance = this;
  }
}

const instance11 = new Singleton1();
const instance12 = new Singleton1();
console.log(instance11 === instance12); // true
console.log("静态属性", Singleton1);
