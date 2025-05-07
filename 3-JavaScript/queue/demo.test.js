// const { Pool } = require('./demo');
import { Pool } from "./demo.js";

describe("Pool 类测试", () => {
  let pool;

  beforeEach(() => {
    pool = new Pool();
  });

  test("应该正确初始化 Pool 实例", () => {
    expect(pool.maxWorkers).toBe(3);
    expect(pool.taskQueue.length).toBe(0);
    expect(pool.activeWorkers).toBe(0);
  });

  test("应该能够添加任务到队列", () => {
    const task = jest.fn();
    pool.addTask(task);
    expect(pool.taskQueue.length).toBe(1);
  });

  test("应该能够处理任务", async () => {
    const task = jest.fn().mockResolvedValue("result");
    const promise = pool.addTask(task);
    await promise;
    expect(task).toHaveBeenCalled();
  });
});
