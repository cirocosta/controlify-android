function Keyboard () {
  this.moveForward = false;
  this.moveBackward = false;
  this.moveLeft = false;
  this.moveRight = false;
  this.moveTop = false; //jump!
  this.canJump = false;
}

Keyboard.prototype.setKeyboard = function() {
  var scope = this;

  document.addEventListener( 'keydown', function (e) {
    scope.onKeyDown.apply(scope, [e]);
  }, false );
  document.addEventListener( 'keyup', function (e) {
    scope.onKeyUp.apply(scope, [e]);
  }, false );
};

Keyboard.prototype.getStatus = function () {
  // console.log({f: this.moveForward,r: this.moveRight,b: this.moveBackward,l: this.moveLeft});

  return {
    f: this.moveForward,
    r: this.moveRight,
    b: this.moveBackward,
    l: this.moveLeft,
    t: this.moveTop
  };
};

Keyboard.prototype.onKeyDown = function(event) {
  switch(event.keyCode) {
      case 38: // up
      case 87: // w
        this.moveForward = true;
        break;

      case 37: // left
      case 65: // a
        this.moveLeft = true;
        break;

      case 40: // down
      case 83: // s
        this.moveBackward = true;
        break;

      case 39: // right
      case 68: // d
        this.moveRight = true;
        break;

      case 32: // space
        // if (this.canJump === true)
          // velocity.y += 350;
        // canJump = false;
        this.moveTop = true;
        break;
  }
};

Keyboard.prototype.onKeyUp = function(event) {
    switch(event.keyCode) {
      case 38: // up
      case 87: // w
        this.moveForward = false;
        break;

      case 37: // left
      case 65: // a
        this.moveLeft = false;
        break;

      case 40: // down
      case 83: // s
        this.moveBackward = false;
        break;

      case 39: // right
      case 68: // d
        this.moveRight = false;
        break;
    }
};

////////////////
// REQUIREJS  //
////////////////

define(function () {
  return Keyboard;
});
