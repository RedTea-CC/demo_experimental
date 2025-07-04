// 版本号数组排序 (Version Array Sorting)

/**
 * 对版本号字符串数组进行从大到小的排序（降序）。
 * 该函数会修改原始数组。
 * 版本号比较规则：将版本号按点('.')分割成多个部分，然后逐个部分进行数值比较。
 * 如果某个版本号的某个部分不存在，则视为 0。
 *
 * @param {string[]} arr - 包含版本号字符串的数组，例如 ['1.1.1', '2.0', '1.10']。
 * @returns {void} 不返回新数组，而是直接修改传入的数组。
 * @example
 * const versions1 = ['1.1.1.1.1.1', '6', '5.4.3', '2.3.1', '2.3.5', '2.3.1.1'];
 * sortVersion(versions1);
 * console.log(versions1); // 预期输出: ['6', '5.4.3', '2.3.5', '2.3.1.1', '2.3.1', '1.1.1.1.1.1']
 */
function sortVersion(arr) {
  arr.sort((a, b) => {
    // 将版本号字符串按点分割成数字数组
    const arr1 = a.split('.').map(Number);
    const arr2 = b.split('.').map(Number);
    const maxLength = Math.max(arr1.length, arr2.length);

    for (let i = 0; i < maxLength; i++) {
      // 获取当前部分的值，如果不存在则视为 0
      const element1 = arr1[i] === undefined ? 0 : arr1[i];
      const element2 = arr2[i] === undefined ? 0 : arr2[i];

      // 如果当前部分不相等，则根据其大小决定排序
      // 注意：这里是降序排序，所以用 element2 - element1
      if (element1 !== element2) {
        return element2 - element1;
      }
    }
    // 所有部分都相等，则认为版本号相同
    return 0;
  });
}

/**
 * 比较两个版本号字符串。
 * 该函数用于 Array.prototype.sort() 的比较器函数，实现升序排序。
 * 版本号比较规则：将版本号按点('.')分割成多个部分，然后逐个部分进行数值比较。
 * 如果某个版本号的某个部分不存在，则视为 0。
 *
 * @param {string} v1 - 第一个版本号字符串。
 * @param {string} v2 - 第二个版本号字符串。
 * @returns {number} 返回一个负数表示 v1 < v2，正数表示 v1 > v2，0 表示 v1 === v2。
 * @example
 * console.log(compareVersion('1.0.0', '1.0.1')); // -1 (1.0.0 < 1.0.1)
 * console.log(compareVersion('2.0', '1.10'));   // 1 (2.0 > 1.10)
 * console.log(compareVersion('1.1', '1.1.0')); // 0 (1.1 === 1.1.0)
 */
function compareVersion(v1, v2) {
  // 将版本号字符串按点分割，并直接转换为数字数组
  const arr1 = v1.split('.').map(Number);
  const arr2 = v2.split('.').map(Number);

  const length = Math.max(arr1.length, arr2.length);

  for (let i = 0; i < length; i++) {
    // 如果数组长度不一致，短的部分用 0 填充
    const num1 = arr1[i] === undefined ? 0 : arr1[i];
    const num2 = arr2[i] === undefined ? 0 : arr2[i];

    // 如果当前部分不相等，则根据其大小决定排序
    // 这里是升序排序，所以用 num1 - num2
    if (num1 !== num2) {
      return num1 - num2;
    }
  }

  // 所有部分都相等，则认为版本号相同
  return 0;
}

/**
 * 对版本号字符串数组进行排序（升序）。
 * 该函数会返回一个新的排序后的数组，不修改原始数组。
 * 内部使用 compareVersion 函数进行比较。
 *
 * @param {string[]} versions - 包含版本号字符串的数组。
 * @returns {string[]} 排序后的新数组（升序）。
 * @example
 * const versions2 = ['1.1.1.1.1.1', '6', '5.4.3', '2.3.1', '2.3.5', '2.3.1.1'];
 * const sortedVersions = sortVersions(versions2);
 * console.log(sortedVersions); // 预期输出: ['1.1.1.1.1.1', '2.3.1', '2.3.1.1', '2.3.5', '5.4.3', '6']
 * console.log(versions2); // 原始数组不变
 */
function sortVersions(versions) {
  // 使用 slice() 创建数组的浅拷贝，以避免修改原始数组
  // 然后使用 compareVersion 进行排序
  return versions.slice().sort(compareVersion);
}
