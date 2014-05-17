require.config({
	paths: {
		threejs: '../three.min'
	}
});

require(['threejs', 'scripts/controls/pointer'], main);

////////////////////
// MAIN execution //
////////////////////

function main (THREE, Pointer) {
	var btn = document.querySelector('#magic-btn');
	var pl = new Pointer();

	pl.setPointerLock(btn, function (isLocked) {
	  console.log("Is locked?");
	  console.log(isLocked);
	}, function (e) {
	  console.log(pl.getMovement(e));
	});

	btn.onclick = function (e) {
	  pl.requestPermission();
	};
}
