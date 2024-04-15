// 浅克隆

// 展开运算符
const originalArray = [1, 2, 3];
const originalObject = { x: 1, y: 2 };
const copyArray = [...originalArray];
const copyObject = { ...originalObject };

// 数组slice()
const originalArray2 = [1, 2, 3];
const copyArray2 = originalArray2.slice();

// -------------------------------------------------------------------------

// 深克隆函数
function deepClone(target) {
  // 如果目标是基本类型或者null，直接返回
  if (typeof target !== "object" || target === null) {
    return target;
  }

  let clone = {};
  for (let key in target) {
    // 递归克隆
    clone[key] = deepClone(target[key]);
  }
  return clone;
}

// Usage example:
let originalObj = {
  name: "John",
  age: 30,
  address: { city: "New York", country: "USA" },
};
let clonedObj = deepClone(originalObj);
console.log(clonedObj); // { name: 'John', age: 30, address: { city: 'New York', country: 'USA' } }
