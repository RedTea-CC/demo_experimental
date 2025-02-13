// ---------------------------------浅克隆----------------------------------------

/**
 * 1. Object.assign() ? 仅适用于对象, 且只能复制对象的可枚举属性
 * 2. 展开运算符
 * 3. 数组slice()
 */

// Object.assign()
const originalObject1 = { x: 1, y: 2 };
const copyObject1 = Object.assign({}, originalObject1);

// 展开运算符
const originalArray = [1, 2, 3];
const originalObject = { x: 1, y: 2 };
const copyArray = [...originalArray];
const copyObject = { ...originalObject };

// 数组slice()
const originalArray2 = [1, 2, 3];
const copyArray2 = originalArray2.slice();

// ----------------------------------深克隆---------------------------------------

/**
 * 基本类型存储在栈内存中，引用类型存储在堆内存中，栈内存中存储的是指向堆内存中的地址
 * 浅克隆只会复制基本类型的值，引用类型的值仍然指向原来的地址
 *
 * 1. JSON.parse(JSON.stringify(obj))
 * 2. 递归克隆
 * 3. 循环引用问题
 */

// 深克隆函数
function deepClone(target) {
  // 如果目标是基本类型或者null，直接返回
  if (typeof target !== "object" || target === null) {
    return target;
  }
  if (target instanceof Date) return new Date(target);
  if (target instanceof RegExp) return new RegExp(target);

  let clone = Array.isArray(target) ? [] : {};

  // in 操作符会检查对象的整个原型链，而 hasOwnProperty 只会检查对象本身的属性
  // for (let key in target) {
  //   if (Object.prototype.hasOwnProperty.call(target, key)) {
  //     // 递归克隆
  //     clone[key] = deepClone(target[key]);
  //   }
  // }

  // 循环处理对象属性
  // Reflect.ownKeys() 方法返回一个由目标对象自身的属性键组成的数组, 不包括继承的属性键, 但是包括不可枚举属性
  // Reflect.ownKeys()接受数组时，多返回一个length属性
  Reflect.ownKeys(target)
    .filter((k) => k !== "length")
    .forEach((key) => {
      clone[key] = deepClone(target[key]);
    });

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
console.log("deepClone:", clonedObj); // { name: 'John', age: 30, address: { city: 'New York', country: 'USA' } }

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
