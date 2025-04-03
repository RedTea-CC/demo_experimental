let input = '{"a": {"b": "test"}, "c": false} {"d": 123, "e": null}{"f": [1, 2, 3]}';

// 转换成对象{}
function parseJson(str) {
  let obj = {};
  let key = "";
  let value = "";
  let inQuotes = false;
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (char === "{") {
      obj[key] = parseJson(str.substring(i + 1));
      break;
    }
    if (char === "}") {
      break;
    }
    if (char === ":") {
      key = value;
      value = "";
      continue;
    }
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (!inQuotes && char === ",") {
      obj[key] = value;
      key = "";
      value = "";
      continue;
    }
    if (!inQuotes && char === " ") {
      continue;
    }
    value += char;
  }
  return obj;
}
console.log(parseJson(input));
