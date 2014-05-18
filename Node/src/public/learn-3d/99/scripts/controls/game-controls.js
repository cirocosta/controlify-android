define(['threejs',
        'scripts/controls/keyboard',
        'scripts/controls/pointer'], function (THREE, Keyboard, Pointer) {

  function GameControls (camera) {
    this.camera = camera;

    this.yawObject;
    this.pitchObject;
    this.prevTime = performance.now();
    this.velocity = new THREE.Vector3();

    this.movement = {x:0.0, y:0.0};

    this.keyboard;
    this.pointer;
  }

  GameControls.prototype._createPlChangeEvent = function(isLocked) {
    var ev = new CustomEvent("plchange", {
      detail: {
        isLocked: isLocked
      },
      bubbles: true,
      cancelable: true
    });

    return ev;
  };

  GameControls.prototype.setGameControls = function(pointerElem) {
    var scope = this;

    this.keyboard = new Keyboard();
    this.keyboard.setKeyboard();
    this.pointer = new Pointer();
    this.setPointer(pointerElem);

    this.camera.rotation.set(0,0,0);

    this.pitchObject = new THREE.Object3D();
    this.pitchObject.add(this.camera);

    this.yawObject = new THREE.Object3D();
    this.yawObject.position.y = 10;
    this.yawObject.add(this.pitchObject);
  };

  GameControls.prototype.getObject = function() {
    return this.yawObject;
  };

  GameControls.prototype.getPitchObject = function() {
    return this.pitchObject;
  };

  GameControls.prototype.setPointer = function (elem) {
    var scope = this;

    this.pointer.setPointerLock(elem, function (isLocked) {
      elem.dispatchEvent(scope._createPlChangeEvent(isLocked));
    }, function (e) {

      var movement = scope.pointer.getMovement(e);
      var PI_2 = Math.PI/2;
      scope.yawObject.rotation.y -= movement.x * 0.002;
      scope.pitchObject.rotation.x -= movement.y * 0.002;
      scope.pitchObject.rotation.x
          = Math.max(-PI_2, Math.min(PI_2, scope.pitchObject.rotation.x));

    }, function () {});

    elem.onclick = function (e) {
      scope.pointer.requestPermission();
    };
  };

  GameControls.prototype.update = function() {
    var time = performance.now();
    var delta = (time - this.prevTime) / 1000;
    var kMov = this.keyboard.getStatus();

    this.velocity.x -= this.velocity.x * 10.0 * delta;
    this.velocity.z -= this.velocity.z * 10.0 * delta;

    // this.velocity.y -= 9.8 * 100.0 * delta;

    var increment = 400.0 * delta;

    if (kMov.f) this.velocity.z -= increment;
    if (kMov.b) this.velocity.z += increment;

    if (kMov.l) this.velocity.x -= increment;
    if (kMov.r) this.velocity.x += increment;

    this.yawObject.translateX(this.velocity.x * delta);
    this.yawObject.translateY(this.velocity.y * delta);
    this.yawObject.translateZ(this.velocity.z * delta);

    this.prevTime = time;
  };

  return GameControls;
});
