require.config({
  paths: {
    threejs: '../three.min'
  }
});

require([
  'threejs',
  'scripts/scenario/main',
  'scripts/controls/game-controls'
], main);


////////////////////
// MAIN execution //
////////////////////

function main (THREE, CanvasObj, GameControls) {
  var elem = document.getElementById('instructions');
  var pl = new Pointer();
  var canvasObj = new CanvasObj();
  var pointerElem = document.getElementById('instructions');

  canvasObj.buildCanvas(pointerElem);

  document.addEventListener('plchange', function (e) {
    if (e.detail.isLocked) {
      pointerElem.style.display = 'none';
      canvasObj.enableRendering();
    } else {
      pointerElem.style.display = '';
      canvasObj.disableRendering();
    }
  }, false);
}
