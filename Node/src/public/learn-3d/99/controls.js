/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////// //
// PARA OBTERMOS A PERMISSAO É PRECISO QUE O USUÁRIO CLIQUE EM ALGO // //
////////////////////////////////////////////////////////////////////// //
/////////////////////////////////////////////////////////////////////////


var havePointerLock = 'pointerLockElement' in document ||
    'mozPointerLockElement' in document ||
    'webkitPointerLockElement' in document;

var element = document.body;

setTimeout(function () {
  console.log(element);

  element.requestPointerLock = element.requestPointerLock ||
             element.mozRequestPointerLock ||
             element.webkitRequestPointerLock;
  // Ask the browser to lock the pointer
  element.requestPointerLock();

  // Ask the browser to release the pointer
  // document.exitPointerLock = document.exitPointerLock ||
  //          document.mozExitPointerLock ||
  //          document.webkitExitPointerLock;
  // document.exitPointerLock();
}, 2000);

document.addEventListener('pointerlockchange', changeCallback, false);
document.addEventListener('mozpointerlockchange', changeCallback, false);
document.addEventListener('webkitpointerlockchange', changeCallback, false);

// Hook mouse move events
document.addEventListener("mousemove", this.moveCallback, false);

function changeCallback (a) {
  console.log("dakds");
  console.log("a");
}

