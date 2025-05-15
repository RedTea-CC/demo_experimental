setImmediate(() => {
  console.log("setImmediate");
});

process.nextTick(() => {
  console.log("nextTick 1");
  process.nextTick(() => {
    console.log("nextTick 2");
  });
});

console.log("global");

Promise.resolve().then(() => {
  console.log("promise 1");
  process.nextTick(() => {
    console.log("nextTick in promise");
  });
});
