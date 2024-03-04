function tem(params) {
  return params;
}

let arry = { 1: [tem] };

arry[1] = arry[1].filter((item) => item !== tem);

console.log("arry", arry[1]);
