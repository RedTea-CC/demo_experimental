/**
 * EventEmitter 类 - 实现发布订阅模式
 *
 * 发布订阅模式允许对象订阅事件并在事件发生时得到通知，
 * 实现了发布者和订阅者之间的松耦合通信。
 */
class EventEmitter {
  /**
   * 存储所有事件及其对应的回调函数
   * 使用私有字段确保事件映射只能被类内部方法访问
   * @private
   */
  #eventsMap = new Map();

  /**
   * 订阅事件
   * @param {string} eventName - 事件名称
   * @param {Function} callback - 当事件触发时调用的回调函数
   */
  on(eventName, callback) {
    const newArry = this.#eventsMap.get(eventName) || [];
    newArry.push(callback);
    this.#eventsMap.set(eventName, newArry);
  }

  /**
   * 发布事件，触发所有订阅该事件的回调函数
   * @param {string} event - 要触发的事件名称
   * @param {...any} args - 传递给回调函数的参数
   */
  emit(event, ...args) {
    if (!this.#eventsMap.has(event)) return;

    this.#eventsMap.get(event).forEach((fn) => fn(...args));
  }

  /**
   * 取消订阅指定事件的所有回调函数
   * @param {string} event - 要取消订阅的事件名称
   */
  off(event) {
    this.#eventsMap.delete(event);
  }

  /**
   * 订阅一次性事件，触发后自动取消订阅
   * @param {string} event - 事件名称
   * @param {Function} callback - 当事件触发时调用的回调函数
   */
  once(event, callback) {
    const onceCallback = (...args) => {
      callback(...args);
      this.off(event);
    };
    this.on(event, onceCallback);
  }
}

// 结合单例和非单例：通过工厂函数灵活创建实例，满足不同需求

// 导出一个全局单例实例
const globalEventEmitter = new EventEmitter();

// 导出一个工厂函数，用于创建新的实例
export const createEventEmitter = () => new EventEmitter();

export default globalEventEmitter;

// ===== 测试用例 =====
console.log("===== EventEmitter 测试用例 =====");

// 测试基本功能
function testBasicFeatures() {
  console.log("\n----- 基本功能测试 -----");
  const eventEmitter = new EventEmitter();

  // 测试普通订阅和发布
  console.log("1. 测试普通订阅和发布：");
  eventEmitter.on("message", (msg) => {
    console.log(`收到消息: ${msg}`);
  });
  eventEmitter.emit("message", "你好，世界！");

  // 测试多个参数
  console.log("\n2. 测试多参数发布：");
  eventEmitter.on("data", (name, age) => {
    console.log(`收到数据: 姓名=${name}, 年龄=${age}`);
  });
  eventEmitter.emit("data", "张三", 25);

  // 测试多个订阅者
  console.log("\n3. 测试多个订阅者：");
  eventEmitter.on("update", (version) => {
    console.log(`订阅者1收到更新: v${version}`);
  });
  eventEmitter.on("update", (version) => {
    console.log(`订阅者2收到更新: v${version}`);
  });
  eventEmitter.emit("update", "1.0.1");

  // 测试取消订阅
  console.log("\n4. 测试取消订阅：");
  eventEmitter.on("notify", () => console.log("通知已接收"));
  eventEmitter.emit("notify");
  eventEmitter.off("notify");
  console.log("取消订阅后：");
  eventEmitter.emit("notify"); // 不应该有输出
}

// 测试一次性订阅
function testOnceSubscription() {
  console.log("\n----- 一次性订阅测试 -----");
  const eventEmitter = new EventEmitter();

  console.log("一次性订阅：");
  eventEmitter.once("message", (msg) => {
    console.log(`收到一次性消息: ${msg}`);
  });

  console.log("\n第一次触发事件：");
  eventEmitter.emit("message", "第一次触发");

  console.log("\n第二次触发事件（不应有输出）：");
  eventEmitter.emit("message", "第二次触发");
}

// 测试单例和工厂模式
function testSingletonAndFactory() {
  console.log("\n----- 单例和工厂模式测试 -----");

  // 测试单例模式
  console.log("1. 测试全局单例：");
  globalEventEmitter.on("global", (msg) => {
    console.log(`全局事件：${msg}`);
  });
  globalEventEmitter.emit("global", "这是全局消息");

  // 测试工厂函数
  console.log("\n2. 测试工厂函数创建的实例：");
  const instance1 = createEventEmitter();
  const instance2 = createEventEmitter();

  instance1.on("local", (msg) => {
    console.log(`实例1收到：${msg}`);
  });

  instance2.on("local", (msg) => {
    console.log(`实例2收到：${msg}`);
  });

  console.log("- 向实例1发送消息：");
  instance1.emit("local", "实例1的消息");

  console.log("- 向实例2发送消息：");
  instance2.emit("local", "实例2的消息");

  console.log("- 验证实例之间互不影响：");
  instance1.emit("unique", "这条消息不应被接收"); // 没有订阅者，不应有输出
}

// 执行所有测试
function runAllTests() {
  testBasicFeatures();
  testOnceSubscription();
  testSingletonAndFactory();

  console.log("\n===== 所有测试完成 =====");
}

// 运行测试
runAllTests();
