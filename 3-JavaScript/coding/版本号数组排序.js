// 输入 ['1.1.1.1.1.1', '6', '5.4.3', '2.3.1', '2.3.1.1']
// 返回从大到小的版本号数组
function sortVersion(arr) {
  arr.sort((a, b) => {
    let arr1 = a.split(".");
    let arr2 = b.split(".");
    let maxLength = Math.max(arr1.length, arr2.length);

    for (let i = 0; i < maxLength; i++) {
      let element1 = arr1[i] ? Number(arr1[i]) : 0;
      let element2 = arr2[i] ? Number(arr2[i]) : 0;
      // 相等则继续比较下一个部分
      if (element1 !== element2) {
        return element2 - element1;
      }
    }
    return 0;
  });
}
const arr = ["1.1.1.1.1.1", "6", "5.4.3", "2.3.1", "2.3.5", "2.3.1.1"];
sortVersion(arr);
console.log(arr);

// ---------

function compareVersion(v1, v2) {
  const arr1 = v1.split(".").map(Number);
  const arr2 = v2.split(".").map(Number);

  const length = Math.max(arr1.length, arr2.length);

  for (let i = 0; i < length; i++) {
    const num1 = arr1[i] || 0; // 如果数组长度不一致，短的部分补0
    const num2 = arr2[i] || 0;

    // if (num1 > num2) return 1;
    // if (num1 < num2) return -1;
    if (num1 !== num2) {
      return num1 - num2;
    }
    // 相等则继续比较下一个部分
  }

  return 0;
}

function sortVersions(versions) {
  return versions.sort(compareVersion);
}
