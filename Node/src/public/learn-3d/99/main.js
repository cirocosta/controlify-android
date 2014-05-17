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


function main (THREE, Pointer, buildCanvas, GameControls) {
  var elem = document.getElementById('instructions');
  var pl = new Pointer();

  pl.setPointerLock(elem, function (isLocked) {
    if (isLocked) {
      buildCanvas(THREE, GameControls);
      elem.style.display = 'none';
    } else {
      elem.style.display = '';
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
