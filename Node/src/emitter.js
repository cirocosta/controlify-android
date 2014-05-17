function Emitter (emittingFun) {
    this.emittingFun = emittingFun;
    this.io = io;
    this.data;
}

Emitter.prototype.setData = function(data) {
    this.data = data;
};

Emitter.prototype.emit = function() {
    this.emittingFun.apply(null);
};
