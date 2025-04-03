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
      return element2 - element1;
    }
  });
}
const arr = ["1.1.1.1.1.1", "6", "5.4.3", "2.3.1", "2.3.1.1"];
sortVersion(arr);
console.log(arr);
