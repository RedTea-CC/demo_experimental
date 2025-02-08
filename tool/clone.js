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
  let clone = Array.isArray(target) ? [] : {};
  for (let key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      // 递归克隆
      clone[key] = deepClone(target[key]);
    }
  }
  return clone;
}

// 深克隆函数，解决循环引用问题
function deepClone1(target, map = new WeakMap()) {
  // 如果目标是基本类型或者null，直接返回
  if (typeof target !== "object" || target === null) {
    return target;
  }

  // 检查这个对象是否已经被复制过
  if (map.has(target)) {
    return map.get(target);
  }

  let clone = Array.isArray(target) ? [] : {};
  // 存储已经复制的对象地址（引用）
  map.set(target, clone);

  for (let key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      // 递归克隆
      clone[key] = deepClone1(target[key], map);
    }
  }
  return clone;
}

// 修改
function deepClone2(target, map = new Map()) {
    // 如果目标是基本类型或者null，直接返回
    if (typeof target !== "object" || target === null) {
      return target;
    }

    // 检查这个对象是否已经被复制过
    if (map.has(target)) {
      return map.get(target);
    }

    let clone = Array.isArray(target) ? [] : {};
    // 存储已经复制的对象地址（引用）
    map.set(target, clone);

    // 循环处理对象属性
    for (let [key, value] of Object.entries(target)) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        // 递归克隆
        clone[key] = deepClone2(value, map);
      }
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
// console.log(clonedObj); // { name: 'John', age: 30, address: { city: 'New York', country: 'USA' } }

let b = [1, 2, 3];
// console.log(deepClone(b));

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: "child",
  },

  field4: [2, 4, 8],
};
target.target = target;

console.log(deepClone1(target));
