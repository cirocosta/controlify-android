define(function () {
	return MyUtils;
});

function MyUtils (arg) {
	this.arg = arg;
}

MyUtils.prototype.getArg = function() {
	return this.arg;
};
