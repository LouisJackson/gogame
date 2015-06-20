var socket = io('/room');

function changeTurn(color) {
	socket.emit('colorPlay', color + ' played !');
}