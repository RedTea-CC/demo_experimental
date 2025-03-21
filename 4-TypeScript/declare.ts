// 1.declare variable
declare let x: number;
// 如果 declare 关键字没有给出变量的具体类型，那么变量类型就是any。
// declare let x;
x = 1;

// 2.declare function
// 注意，这种单独的函数类型声明语句，只能用于declare命令后面
declare function sayHello(name: string): void;

sayHello("张三");

// 3.declare class
declare class Animal {
  constructor(name: string);
  eat(): void;
  sleep(): void;
}

// 4.declare global
export {};

declare global {
  interface Window {
    myAppConfig: object;
  }
}

const config = window.myAppConfig;
