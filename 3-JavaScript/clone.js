// 深克隆
export function deepClone(target, map = new WeakMap()) {
  // 基本类型直接返回
  if (typeof target !== "object" || target === null) return target;

  if (map.has(target)) return map.get(target);

  const clone = Array.isArray(target) ? [] : {};
  map.set(target, clone);

  for (const key in target) {
    if (Object.hasOwn(target, key)) {
      const element = target[key];

      clone[key] = deepClone(element, map);
    }
  }
  return clone;
}
