let obj = {
  name: "123",
  sayHi: () => {
    console.log(`hi,${this?.name}`);
  },
};

obj.sayHi();

console.log(global);
