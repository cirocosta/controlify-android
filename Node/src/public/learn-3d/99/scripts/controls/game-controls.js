define(['threejs',
        'scripts/controls/keyboard',
        'scripts/controls/pointer'], function (THREE, Keyboard, Pointer) {

  function GameControls (camera) {
    this.camera = camera;
    this.yawObject;
    this.prevTime = performance.now();
    this.velocity = new THREE.Vector3();
  }

  GameControls.prototype.setGameControls = function() {
    var scope = this;
    var pitchObject;

    this.camera.rotation.set(0,0,0);

    pitchObject = new THREE.Object3D();
    pitchObject.add(this.camera);

    this.yawObject = new THREE.Object3D();
    this.yawObject.position.y = 10;
    this.yawObject.add(pitchObject);
  };

  GameControls.prototype.getObject = function() {
    return this.yawObject;
  };

  GameControls.prototype.update = function() {
    var time = performance.now();
    var delta = (time - this.prevTime) / 1000;

    this.velocity.x = 0.02;
    this.velocity.y = 0.02;
    this.velocity.z = 0.02;

    this.yawObject.translateX(this.velocity.x * delta);
    this.yawObject.translateY(this.velocity.y * delta);
    this.yawObject.translateZ(this.velocity.z * delta);

    prevTime = time;
  };

  return GameControls;
});
