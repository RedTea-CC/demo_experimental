var canvas = document.getElementById("stage");
var ctx = canvas.getContext("2d");
// var dragging = false;
var width = 0;
var height = 0;

let imageArry = ["img/1.png", "img/5.png", "img/10.png"];

//加载图片
resources.load(imageArry);

//添加回调函数，图像加载完毕后执行，启动游戏
resources.onReady(init);

function init() {
  // 当前图片的长度和宽度
  width = resources.get("img/1.png").width;
  height = resources.get("img/1.png").height;
  console.log("当前图片的长度和宽度", width, height);

  // 画·图片的位置
  drawWidth = canvas.width / 2 - width / 2;
  drawHeight = canvas.height / 2;
  console.log("画·图片的位置", drawWidth, drawHeight);

  // 初始图片
  ctx.drawImage(resources.get("img/5.png"), drawWidth, drawHeight);
}

var dy = 50; // 图片移动距离
const game = {
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
  count: 0, //计数器
};

canvas.addEventListener("touchstart", function (e) {
  game.startX = e.touches[0].clientX;
  game.startY = e.touches[0].clientY;

  e.preventDefault();
});
canvas.addEventListener("touchend", function (e) {
  //鼠标松开
  game.endX = e.changedTouches[0].clientX;
  game.endY = e.changedTouches[0].clientY;

  console.log("移动距离", game.startY - game.endY);

  if (game.startY - game.endY > 50) {
    game.count++;
    console.log("成功触发动画", game.count);

    Animation(50);
  }
});

function Animation(distance) {
  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 固定位置的图片
  ctx.drawImage(resources.get("img/10.png"), drawWidth, drawHeight);
  if (canvas.height + height < distance) {
    return;
  }

  // 向上滑动的图片
  ctx.drawImage(resources.get("img/1.png"), drawWidth, drawHeight - distance);
  // console.log('每次动画结束y坐标：', (game.endCoordinate.y - dy));

  // 动画每次图片的移动距离
  distance += 100;

  const timeId = setTimeout(() => {
    Animation(distance);
    clearTimeout(timeId);
  }, 10);
}

//窗口坐标转canvas坐标............
function windowToCanvas(canvas, x, y) {
  var canvasRectangle = canvas.getBoundingClientRect();

  return {
    x: x - canvasRectangle.left,
    y: y - canvasRectangle.top,
  };
}
