'use strict';

var express = require('express');
var sd = require('./service-discovery');
var sc = require('./socket-connections');

var app = express();
var io;
var localIp = sd.getLocalIp();
var server = app.listen(3000, '0.0.0.0', function () {
  console.log("Server up on %s:%d",
              localIp, server.address().port);

  main();
});


//////////
// MAIN //
//////////

function main () {
  app.use(express.static(__dirname + '/public'));

  sc.openConnection(server);

  sd.startAdvertisement('ann-controller', server.address().port);
  sd.startBrowser();
}
