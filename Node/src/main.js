var express = require('express');
var sd = require('./service-discovery');
var sc = require('./socket-connections');

var app = express();
var io;
var localIp = sd.getLocalIp();
var server = app.listen(3000, '0.0.0.0', function () {
  console.log("Server up on %s:%d", localIp, server.address().port);

  main();
});


//////////
// MAIN //
//////////

function main () {
  app.get('/', function (req, res) {
    res.send('error!');
  });

  sd.startAdvertisement('ann-controller', server.address().port);
  sd.startBrowser();

  sc.openConnection(app);
}
