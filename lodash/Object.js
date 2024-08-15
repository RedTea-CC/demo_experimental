const _ = {
  get: function (object, path, defaultValue) {
    // 如果传入的路径不是数组，则将其转换为数组
    const pathArray = Array.isArray(path) ? path : path.match(/[^.[\]]+/g);

    // 通过 reduce 迭代路径数组，一步步深入对象
    const result = pathArray.reduce((acc, key) => {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, object);

    // 如果结果为 undefined，则返回默认值
    return result === undefined ? defaultValue : result;
  },
  // 检查 path 是否是object对象的直接属性
  has: function (object, path) {
    const pathArray = Array.isArray(path) ? path : path.match(/[^.[\]]+/g);

    const result = pathArray.reduce((acc, key) => {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, object);
    return result !== undefined;
  },
};
