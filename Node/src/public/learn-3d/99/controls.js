function PointerLock () {}

/**
 * Checks if the browser has Pointer Lock enabled
 */
PointerLock.prototype._isEnabled = function() {
  return 'pointerLockElement' in document ||
         'mozPointerLockElement' in document ||
         'webkitPointerLockElement' in document;
};

/**
 * Sets the pointerLock stuff to the element passed.
 * @param {DOMElement} element a DOM element which will be pointer
 *                             locked
 * @param {Function} ccb     the callback function for the change in
 *                           the state of pointer lock. It receives a
 *                           boolean as an argument (isLocked)
 *                           indicating if it is locked of not.
 * @param {Function} mcb     the callback function for the change in
 * the movimentation of the cursor
 */
PointerLock.prototype.setPointerLock = function(element, ccb, mcb) {
  if (!this._isEnabled())
    throw new Error('No pointerLock for this browser :(');

  var scope = this;

  // preparing the element
  element.requestPointerLock = element.requestPointerLock ||
                               element.mozRequestPointerLock ||
                               element.webkitRequestPointerLock;
  this.element = element;
  document.exitPointerLock = document.exitPointerLock ||
                             document.mozExitPointerLock ||
                             document.webkitExitPointerLock;

  // preparing the callbacks

  var plcCbFun = function (e) {
    scope._pointerLockCallback(e, ccb, mcb);
  }

  document.addEventListener('pointerlockchange', plcCbFun, false);
  document.addEventListener('mozpointerlockchange', plcCbFun, false);
  document.addEventListener('webkitpointerlockchange', plcCbFun, false);

  return this;
};


PointerLock.prototype._pointerLockCallback = function(e, ccb, mcb) {

  var element = document.querySelector('#magic-btn');

  var scope = this;
  var mmCbFun = function (e) {
    scope._moveCallback(e, mcb);
  }

  if (document.pointerLockElement === element ||
      document.mozPointerLockElement === element ||
      document.webkitPointerLockElement === element) {

    ccb(true);
    document.addEventListener("mousemove", mmCbFun, false);
  } else {
    ccb(false);
    document.removeEventListener("mousemove", mmCbFun, false);
  }
};

/**
 * Triggers the permission for using this feature
 */
PointerLock.prototype.requestPermission = function() {
  this.element.requestPointerLock();
};

/**
 * Releases the pointerLock
 */
PointerLock.prototype.releaseThePointer = function() {
  document.exitPointerLock();
};

PointerLock.prototype._moveCallback = function(e, mcb) {
  var movementX = e.movementX ||
                  e.mozMovementX ||
                  e.webkitMovementX ||
                  0,
      movementY = e.movementY ||
                  e.mozMovementY ||
                  e.webkitMovementY ||
                  0;

  mcb({x: movementX, y: movementY});
};
