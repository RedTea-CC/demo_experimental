// 深克隆函数，支持对象、数组及循环引用
export function deepClone(target, map = new WeakMap()) {
  // 如果是基本类型或 null，直接返回
  if (typeof target !== "object" || target === null) return target;

  // 如果已经克隆过该对象，则直接返回克隆结果（处理循环引用）
  if (map.has(target)) return map.get(target);

  // 创建克隆对象，数组或普通对象
  const clone = Array.isArray(target) ? [] : {};
  // 将当前对象存入 WeakMap，避免循环引用问题
  map.set(target, clone);

  // 遍历对象的自身属性
  for (const key in target) {
    if (Object.hasOwn(target, key)) {
      const element = target[key];
      // 递归克隆子属性
      clone[key] = deepClone(element, map);
    }
  }

  return clone;
}
