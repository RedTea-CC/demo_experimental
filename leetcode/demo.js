function solution(n, k, data) {
  // 检查输入是否合法
  if (n !== data.length || k >= n) {
    throw new Error("Invalid input: n must equal data length and k must be less than n.");
  }

  // 使用数组模拟双端队列
  const mins = [];
  let result = 0;

  for (let j = 0; j < n; j++) {
    // 维护单调队列：移除队列中比当前元素大的元素
    while (mins.length > 0 && mins.at(-1)[1] > data[j]) {
      mins.pop();
    }
    // 将当前元素加入队列
    mins.push([j, data[j]]);

    // 移除超出窗口范围的元素
    while (mins.length > 0 && mins[0][0] <= j - k) {
      mins.shift();
    }

    // 累加当前窗口的最小值
    result += mins[0][1];
  }

  return result;
}

function main() {
  // Add your test cases here
  console.log(solution(5, 2, [1, 2, 3, 3, 2]) === 9);
}

main();
