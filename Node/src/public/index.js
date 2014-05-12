var socket = io.connect('http://localhost:3000');
var events = {
    mobile: {
        connection: 'mobile-connect',
        allData: 'mobile-all-data'
    },
    browser: {
        connection: 'browser-connect',
        devicesList: 'devices-list'
    }
};

socket.on('connect', function () {
	console.log("Connected!");
	socket.emit(events.browser.connection, {a: "b"});
});

socket.on('connect_error', function (err) {
	console.log(err);
});

socket.on(events.mobile.connection, function (data) {
	console.log(data);
});

socket.on(events.mobile.allData, function (data) {
    console.log(data);
});
