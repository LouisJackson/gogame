var socket = io();

function create_room(size,colorWanted) {
	var id = Math.random().toString(36).substring(2,8);
	game = new GoGame(size);
	game.create();
	socketContent = {
		'roomNumber': id,
		'board': game.board,
		'chainBoard': game.chainBoard,
		'chains': game.chains,
		'whiteCapture': game.whiteCaptures,
		'blackCapture': game.blackCaptures,
		'currentPlayer': 'black',
		'blackId': id+0,
		'whiteId': id+1, 
		'colorWanted': colorWanted
	}
	console.log(socketContent);
	socket.emit('loadRoom',socketContent);
	document.location.href = '/room/'+id;
}

var room_socket = io('/room/:id');


room_socket.on('askUrl', function(lol) {
	var url = document.location.href.substring( document.location.href.lastIndexOf( '/' ) );
	alert(url);
	room_socket.emit('giveUrl', url);
});