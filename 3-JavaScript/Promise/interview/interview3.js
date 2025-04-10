//S1
setTimeout(() => {
  console.log(1);
  //S4
  setTimeout(() => {
    //M2
    Promise.resolve().then(() => {
      console.log(9);
    });
  }, 0);
  //M3
  Promise.resolve().then(() => {
    console.log(7);
  });
}, 0);

console.log(2);

//M1
Promise.resolve().then(() => {
  console.log(3);
});

//S2
setTimeout(() => {
  console.log(8);
  //S5
  setTimeout(() => {
    console.log(5);
  }, 0);
}, 0);

//S3
setTimeout(() => {
  //M6
  Promise.resolve().then(() => {
    console.log(4);
  });
}, 0);

console.log(6);

// 2 6 3 1 7 8 4 9 5