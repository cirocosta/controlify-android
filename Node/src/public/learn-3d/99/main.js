require.config({
  paths: {
    threejs: '../three.min'
  }
});

require([
  'threejs',
  'scripts/controls/pointer',
  'scripts/scenario/main',
  'scripts/controls/game-controls'
], main);


////////////////////
// MAIN execution //
////////////////////


function main (THREE, Pointer, CanvasObj, GameControls) {
  var elem = document.getElementById('instructions');
  var pl = new Pointer();
  var canvasObj = new CanvasObj();

  canvasObj.buildCanvas();

  pl.setPointerLock(elem, function (isLocked) {
    if (isLocked) {
      elem.style.display = 'none';
      canvasObj.enableRendering();
    } else {
      elem.style.display = '';
      canvasObj.disableRendering();
    }
  }, function (e) {
    console.log(pl.getMovement(e));
  }, function (e) {
    console.log("ERROR :(");
  });

  elem.onclick = function (e) {
    pl.requestPermission();
  };
}
