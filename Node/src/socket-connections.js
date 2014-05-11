var io;

function openConnection (app, onSocketConnection) {
  io = require('socket.io').listen(app);

  io.sockets.on('connection', function (socket) {
    console.log(socket);
  });
}

module.exports = {
  openConnection: openConnection
};
