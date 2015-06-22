var express = require('express');
var app = express();
var mongojs = require("mongojs");
var path = require('path');

var uri = "mongodb://admin:gothamh2@ds047752.mongolab.com:47752/gotham";
var db = mongojs(uri, ["games"]);

// db.on('ready',function() {
//     console.log('database connected');
// });

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static(__dirname));

app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.get('/room/:id', function(req, res){
	res.sendFile(__dirname +  '/game.html');
});


var home_io = io.of('/');
var room_io = io.of('/room/:id');


home_io.on('connection', function(socket){
	console.log('user connected to home');
	socket.on('loadRoom',function(socket){
		console.log(socket.roomNumber);
		db.games.save(socket, function(err, saved) {
			if( err || !saved ) console.log(err);
			else {
				console.log("Game created");
				console.log(saved.roomNumber);
				currentGameId = saved._id;
			};
		});
	});
});

room_io.on('connection', function(socket){
	console.log('user connected to room');
	room_io.emit('askUrl', 'lol');
});

// app.get('/room', function(req, res) {
// 	res.sendFile(__dirname + '/game.html');
// });

// var home_nsp = io.of('/');
// var room_nsp = io.of('/room');

// var currentGameId;

// var playersCount = 0;

// room_nsp.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(socket){
//   	console.log('user disconnected')
//   	playersCount--;
//   	console.log('they are currently: ' +  playersCount + ' players connected.');
//   });
//   playersCount++;
//   if (playersCount == 1) {
//   	socket.on('initGame', function(game) {
// 		db.games.save(game, function(err, saved) {
// 			if( err || !saved ) console.log(err);
// 			else {
// 				console.log("Game created");
// 				console.log(saved._id);
// 				currentGameId = saved._id;
// 			};
// 		});
//   	});
//   }
//   if (playersCount == 2) {
//   	console.log(currentGameId);
//   }
//   socket.on('colorPlay', function(game){
//   	db.games.update({_id:currentGameId}, { $set : { board:game.board, chainBoard: game.chainBoard, chains: game.chains } }, function(err, test) {
// 		if(err) console.log(err);
// 		else console.log(test);
// 		db.games.findOne({_id:mongojs.ObjectId(currentGameId)}, function(err, doc) {
// 			if (err) {
// 				console.log(err);
// 			}
// 			else {
// 				console.log('data sent');
// 				room_nsp.emit('updateGame',doc);
// 			}
// 		});
// 	});

//   });
//   // io.emit('updateGame',)
// });


http.listen(3000, function(){
  console.log('listening on *:3000');
});