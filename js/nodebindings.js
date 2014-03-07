// connect to the server
socket = io.connect('http://localhost:2000');

// chirp a message to the node server
function socketSend(key, message) {
	socket.emit(key, message);
}

function play() {
	console.log('Playing');
	socketSend('data', 'api/engine:play');
}

function pause() {
	console.log('Pausing');
	socketSend('data', 'api/engine:pause');
}

socket.on('message', function (data) {
	console.log(data);
});

