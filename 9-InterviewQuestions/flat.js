// 扁平化数组
const arr = [1, 2, [3, 4, [5]]];

function cusFlat(array) {
  let newArray = [];
  function flat(params) {
    params.forEach((element) => {
      if (Array.isArray(element)) {
        flat(element);
      } else {
        newArray.push(element);
      }
    });
  }
  flat(array);

  return newArray;
}

function cusFlat2(array, depth = 1) {
  return depth > 0
    ? array.reduce((arr, value) => arr.concat(Array.isArray(value) ? cusFlat2(value, depth - 1) : value), [])
    : [...array];
}

const flatArray = cusFlat2(arr);
console.log(arr);
console.log(flatArray);
