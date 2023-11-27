const array = [1, 2, 3, 1, 2, 4, 5];

// set结构去重：不会保留原数组中元素的顺序
// const uniqueArray = [...new Set(array)];
// const uniqueArray = Array.from(new Set(array));

// filter 和 indexOf：保留原数组中的顺序
/* const uniqueArray = array.filter(
	// 相等：只保留第一次出现的元素
	(value, index, self) => self.indexOf(value) === index
); */

const uniqueArray = array.reduce((acc, currentValue) => {
	if (!acc.includes(currentValue)) {
		acc.push(currentValue);
	}
	return acc;
}, []);

console.log(uniqueArray);

// ---------------------分隔符-----------------------

/* const array = [
	{ name: "aaa", id: 1 },
	{ name: "aaaa", id: 1 },
	{ name: "bbb", id: 2 },
	{ name: "ccc", id: 1 },
	{ name: "ddd", id: 3 },
]; */

/**
 * 数组对象的属性去重1
 * @param {Array} array 数组
 * @param {char} attribute 数组对象属性
 * @returns 去重后数组
 */
/* function uniqueArray(array, attribute) {
	return array.reduce((acc, obj) => {
		if (!acc.some((item) => item[attribute] === obj[attribute])) {
			acc.push(obj);
		}
		return acc;
	}, []);
} */

/**
 * 数组对象的属性去重2
 */
/* function uniqueArray(array, attribute) {
	return Array.from(new Set(array.map((obj) => obj[attribute]))).map((value) =>
		array.find((obj) => obj[attribute] === value)
	);
} */
/* function uniqueArray(array, attribute) {
	if (!attribute) {
		return Array.from(new Set(array));
	}
	// 1. 先获取数组对象的属性值
	let newArr = Array.from(new Set(array.map((obj) => obj[attribute])));
	// let newArr = [...new Set(array.map((obj) => obj[attribute]))];	//	Array.from更高效
	// 2. 再根据属性值获取数组对象
	return newArr.map((value) => array.find((obj) => obj[attribute] === value));
}
 */

// console.log(uniqueArray(array, "id"));
