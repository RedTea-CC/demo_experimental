// 发布订阅模式
class EventEmitter {
  #eventsMap = new Map();

  // 订阅事件
  on(eventName, callback) {
    const newArry = this.#eventsMap.get(eventName) || [];
    newArry.push(callback);
    this.#eventsMap.set(eventName, newArry);
  }

  // 发布事件
  emit(event, ...args) {
    if (!this.#eventsMap.has(event)) return;

    this.#eventsMap.get(event).forEach((fn) => fn(...args));
  }

  off(event) {
    this.#eventsMap.delete(event);
  }

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

const eventEmitter = new EventEmitter();

// 唯一订阅
eventEmitter.once("message", (msg) => {
  console.log(`Received message: ${msg}`);
});

// 发布事件
setTimeout(() => {
  eventEmitter.emit("message", "Hello, World!");
}, 3000);
