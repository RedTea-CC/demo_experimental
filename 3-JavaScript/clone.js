// 深克隆
function deepClone(target) {
  if (typeof target !== "object" || target === null) return target;

  const clone = Array.isArray(target) ? [] : {};
}
