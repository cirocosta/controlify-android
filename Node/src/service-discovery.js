'use strict';

var mdns = require('mdns2');

function startAdvertisement (name, port) {
    var ad;
    var txtRecord = {name: name};

    ad = mdns.createAdvertisement(mdns.tcp('http'), port, txtRecord);
    ad.start();
}

function startBrowser (serviceName) {
    var browser = mdns.createBrowser(mdns.tcp('http'));
    browser.on('serviceUp', function (service) {
        console.log("service up: ", service);
    });

    browser.on('serviceDown', function (service) {
        console.log("service down: ", service);
    });

    browser.start();
}

function getLocalIp () {
    var ifaces = require('os').networkInterfaces();
    var wlan0 = ifaces['wlan0'];

    if (!wlan0) {
        return;
    }

    return wlan0.length > 1 ? wlan0[0].address : '';
};

module.exports = {
    getLocalIp: getLocalIp,
    startAdvertisement: startAdvertisement,
    startBrowser: startBrowser
};
