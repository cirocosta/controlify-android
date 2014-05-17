define(['helper/utils'], function (utils) {

	var a = new utils('dahora');

	return showStuff(a);
});


function showStuff (object) {
	return object.getArg();
}
