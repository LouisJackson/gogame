var socket = io('/room');

function changeTurn(infos) {
	socket.emit('colorPlay', infos);
}

function initGame(infos) {
	socket.emit('initGame', infos);
}

socket.on('updateGame', function(data) {
	console.log(data);
	game.updateGame(data);
});