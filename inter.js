class TaskQueue {
  // 私有字段
  #queue = [];
  #runningCount = 0;
  #maxConcurrent = 5;
  #results = []; // 用于保存任务结果

  add(task) {
    // 将任务添加到队列中
    this.#queue.push(task);
    // 执行下一个任务
    this.#next();
  }

  getResults() {
    // 返回所有任务的结果
    return this.#results;
  }

  // 私有方法
  #next() {
    // 如果当前正在执行的任务数量小于最大并发数，并且队列中有任务，则执行下一个任务
    while (this.#runningCount < this.#maxConcurrent && this.#queue.length > 0) {
      // 取出队列中的第一个任务
      const task = this.#queue.shift();
      // 执行任务
      const taskIndex = this.#results.length; // 保存当前任务的索引
      this.#results.push(undefined); // 占位，确保结果数组顺序一致
      task()
        .then((result) => {
          // 保存任务结果
          this.#results[taskIndex] = result;
        })
        .catch((error) => {
          // 保存任务错误
          this.#results[taskIndex] = { error };
        })
        .finally(() => {
          // 任务执行完成后，将正在执行的任务数量减1
          this.#runningCount--;
          // 执行下一个任务
          this.#next();
        });
      // 将正在执行的任务数量加1
      this.#runningCount++;
    }
  }
}

// 创建实例
const taskQueue = new TaskQueue();

// 添加任务
for (let i = 1; i <= 10; i++) {
  taskQueue.add(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = `Task ${i} result`;
        console.log(`${result} completed`);
        resolve(result);
      }, Math.random() * 1000);
    });
  });
}

// 等待所有任务完成后打印结果
setTimeout(() => {
  console.log("All results:", taskQueue.getResults());
}, 3000);
