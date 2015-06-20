var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));

app.get('/', function(req, res){
  res.sendFile('index.html');
});


app.get('/room', function(req, res) {
	res.sendFile(__dirname + '/game.html');
});

var home_nsp = io.of('/');
var room_nsp = io.of('/room');

room_nsp.on('connection', function(socket){
  console.log('a user connected');
  // socket.on('colorPlay', function(msg){
  // 	console.log('message: ' + msg);
  // });
});

// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   });
// });

http.listen(3000, function(){
  console.log('listening on *:3000');
});