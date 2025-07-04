// const { Pool } = require('./demo');
import { Pool } from "./demo.js";

// Pool 类单元测试 (Unit Tests for Pool Class)

/**
 * 本文件包含 `Pool` 类的单元测试，使用 Jest (或兼容的测试框架) 来验证其核心功能和行为。
 * 测试覆盖了 `Pool` 实例的初始化、任务的添加和处理等方面。
 */

describe("Pool 类测试", () => {
  let pool; // 声明一个变量用于存储 Pool 实例

  // 在每个测试用例运行前执行，用于初始化一个新的 Pool 实例，确保测试之间的隔离性。
  beforeEach(() => {
    pool = new Pool();
  });

  test("应该正确初始化 Pool 实例", () => {
    // 验证 Pool 实例的属性是否按预期初始化
    expect(pool.maxWorkers).toBe(3); // 默认最大工作者数应为 3
    expect(pool.taskQueue.length).toBe(0); // 初始任务队列应为空
    expect(pool.activeWorkers).toBe(0); // 初始活跃工作者数应为 0
  });

  test("应该能够添加任务到队列", () => {
    // 创建一个模拟任务函数
    const task = jest.fn();
    // 添加任务到池中
    pool.addTask(task);
    // 验证任务队列的长度是否增加
    expect(pool.taskQueue.length).toBe(1);
  });

  test("应该能够处理任务", async () => {
    // 创建一个模拟任务函数，并使其返回一个已解决的 Promise
    const task = jest.fn().mockResolvedValue("result");
    // 添加任务到池中，并获取返回的 Promise
    const promise = pool.addTask(task);
    // 等待任务 Promise 解决
    await promise;
    // 验证任务函数是否被调用
    expect(task).toHaveBeenCalled();
    // 验证活跃工作者数是否回到 0 (任务完成并清理)
    expect(pool.activeWorkers).toBe(0);
  });

  test("应该限制并发任务数", async () => {
    const maxConcurrency = 2; // 设置最大并发数为 2
    const customPool = new Pool(maxConcurrency);
    const taskExecutionOrder = [];
    let currentlyActive = 0;

    const createTask = (id) => () =>
      new Promise((resolve) => {
        currentlyActive++;
        taskExecutionOrder.push(`start-${id}`);
        expect(currentlyActive).toBeLessThanOrEqual(maxConcurrency); // 验证并发数未超限
        setTimeout(() => {
          currentlyActive--;
          taskExecutionOrder.push(`end-${id}`);
          resolve(`Task ${id} done`);
        }, 50);
      });

    // 添加 5 个任务，期望它们按批次执行
    const promises = [
      customPool.addTask(createTask(1)),
      customPool.addTask(createTask(2)),
      customPool.addTask(createTask(3)),
      customPool.addTask(createTask(4)),
      customPool.addTask(createTask(5)),
    ];

    await Promise.all(promises); // 等待所有任务完成
    await customPool.drain(); // 确保池中所有任务都已清理

    expect(currentlyActive).toBe(0); // 验证所有任务都已完成
    // 验证执行顺序，确保并发限制生效 (例如 start-1, start-2 之后才能有 end-1/end-2, 然后是 start-3 等)
    // 这是一个简化的检查，更严格的测试需要更复杂的顺序断言
    expect(taskExecutionOrder).toEqual(expect.arrayContaining([
      "start-1", "start-2", // 初始两个任务开始
      expect.stringMatching(/end-[12]/), // 任何一个先完成
      expect.stringMatching(/start-[34]/), // 新的任务开始
      expect.stringMatching(/end-[1234]/), // 继续完成
      expect.stringMatching(/start-5/), // 最后一个任务开始
      "end-5" // 最后一个任务完成
    ]));
  });

  test("should handle task failures", async () => {
    const errorMessage = "Task failed";
    const failingTask = jest.fn().mockRejectedValue(new Error(errorMessage));

    const promise = pool.addTask(failingTask);

    await expect(promise).rejects.toThrow(errorMessage); // 验证 Promise 被拒绝并抛出正确错误
    expect(failingTask).toHaveBeenCalled(); // 验证任务函数仍然被调用
    expect(pool.activeWorkers).toBe(0); // 验证失败后也进行了清理
  });

  test("drain should wait for all tasks to complete", async () => {
    let taskCount = 0;
    const totalTasks = 5;

    const longRunningTask = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          taskCount++;
          resolve();
        }, 100); // 模拟较长时间的任务
      });

    for (let i = 0; i < totalTasks; i++) {
      pool.addTask(longRunningTask);
    }

    expect(taskCount).toBe(0); // 任务尚未开始完成
    await pool.drain(); // 等待所有任务完成
    expect(taskCount).toBe(totalTasks); // 验证所有任务都已完成
    expect(pool.activeWorkers).toBe(0); // 验证池已空闲
    expect(pool.taskQueue.length).toBe(0); // 验证队列已清空
  });
});
