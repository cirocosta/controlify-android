'use strict';

var io;
var events = {
    mobile: {
        connection: 'mobile-connect'
    },
    browser: {
        connection: 'browser-connect',
        devicesList: 'devices-list'
    }
};

var rooms = {
  mobile: 'mobile',
  browser: 'browser'
};

function openConnection (app, onSocketConnection) {
  io = require('socket.io').listen(app);

  io.sockets.on('connection', function (socket) {

    // quando houver conexao do celular

    socket.on(events.mobile.connection, function (data) {
      socket.join(rooms.mobile);
      socket.broadcast.to(rooms.browser)
            .emit(events.mobile.connection, data);
    });

    // quando houver conexao do browser

    socket.on(events.browser.connection, function (data) {
      socket.join(rooms.browser);
    });
  });
}

module.exports = {
  openConnection: openConnection
};
