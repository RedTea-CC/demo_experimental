import { deepClone } from "./clone.js";

// 测试用例
function runTests() {
  // 测试基本类型
  console.assert(deepClone(42) === 42, "基本类型克隆失败");
  console.assert(deepClone(null) === null, "null 克隆失败");
  console.assert(deepClone("hello") === "hello", "字符串克隆失败");

  // 测试数组
  const arr = [1, 2, { a: 3 }];
  const clonedArr = deepClone(arr);
  console.assert(JSON.stringify(clonedArr) === JSON.stringify(arr), "数组克隆失败");
  console.assert(clonedArr !== arr, "数组引用未分离");

  // 测试对象
  const obj = { x: 10, y: { z: 20 } };
  const clonedObj = deepClone(obj);
  console.assert(JSON.stringify(clonedObj) === JSON.stringify(obj), "对象克隆失败");
  console.assert(clonedObj !== obj, "对象引用未分离");

  // 测试循环引用
  const circularObj = {};
  circularObj.self = circularObj;
  const clonedCircularObj = deepClone(circularObj);
  console.assert(clonedCircularObj !== circularObj, "循环引用克隆失败");
  console.assert(clonedCircularObj.self === clonedCircularObj, "循环引用未正确处理");

  console.log("所有测试用例通过！");
}

runTests();
