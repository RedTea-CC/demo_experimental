function initializeGame() {
   var money, arrow, finger, overlay, overlayContainer, touchEndHandler;

   // Reset game state
   _gameOver = false;
   LF.global.setPauseLoop(false);
   hg.time.init();
   hg.grade.set(0);
   e.touchLock = true;
   e.money = new Money();

   // Check if the game was successful
   if (HdGame.isplaySucess) {
       hg.time.start();
       e.touchLock = false;
   } else {
       // Initialize elements for the tutorial
       money = new LF.bitmap(
           new LF.bitmapData(hg.assets[hg.edit.getImgInfo("money100").path]),
           LF.global.width / 2 - 2.625 * g_rem,
           LF.global.height / 2 - 5 * g_rem,
           5.25 * g_rem,
           10 * g_rem
       );
       arrow = new LF.bitmap(
           new LF.bitmapData(hg.assets[_resRoot + "/image/sssq/arrow.png?v=201606141010"]),
           LF.global.width / 2 - 0.5 * g_rem,
           LF.global.height / 2 - 5 * g_rem - 1.5 * g_rem - 0.425 * g_rem,
           1 * g_rem,
           1.5 * g_rem
       );
       finger = new LF.bitmap(
           new LF.bitmapData(hg.assets[_resRoot + "/image/sssq/finger.png"]),
           LF.global.width / 2 + 2.625 * g_rem + 0.8 * g_rem,
           LF.global.height / 2 - 1 * g_rem,
           2 * g_rem,
           2 * g_rem
       );

       overlay = new LF.bitmap(
           new LF.bitmapData("#000", 0, 0, LF.global.width, LF.global.height)
       );
       overlay.alpha = 0.92;

       overlayContainer = new LF.sprite();
       overlayContainer.addChild(money);
       overlayContainer.addChild(arrow);
       overlayContainer.addChild(finger);

       // Add text to the overlay
       overlayContainer.graphics.add(function () {
           LF.global.canvas.font = "normal " + 0.55 * g_rem + "px Arial";
           LF.global.canvas.fillStyle = "#fff";
           LF.global.canvas.textBaseline = "top";
           LF.global.canvas.fillText(
               "向上滑动",
               LF.global.width / 2 + 2.625 * g_rem + 0.775 * g_rem,
               LF.global.height / 2 + 1.275 * g_rem
           );
       });

       // Add overlay to the game
       e.boxLayer.addChild(overlayContainer);

       // Add touchend event listener
       touchEndHandler = function () {
           e.touchLock = false;
           overlayContainer.remove();
           overlayContainer.die();
           hg.time.start();
           LF.global.canvasObj.removeEventListener("touchend", touchEndHandler);
       };

       LF.global.canvasObj.addEventListener("touchend", touchEndHandler);
   }
}
