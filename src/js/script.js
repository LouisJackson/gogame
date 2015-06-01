// New class to create a Go Game
function GoGame (size) {


	this.size = size; //the size of the board
	this.board; //we create a new empty board
	this.currentPlayer = 'black';
	this.oppositePlayer;
	this.chains = new Array(); // an array that countains the chains on the board.


	this.create = function() {
		var m = new Array();
		for (var i = 0; i < this.size; i++) {
        	m[i] = new Array();
        	for (var j = 0; j < this.size; j++)
            	m[i][j] = false;
    	}
    	this.board = m;
    	return m;
	};
	//method that create the board

	this.render = function(board) {
		$('#table').append('<table><tbody>');
		for (var i = 0; i < board.length; i++) {
			$('#table').append('<tr>');
			for(var j=0; j< board.length; j++) {
				$('#table').append('<td dataX="'+i+'" dataY="'+j+'"></td>');
			}
			$('#table').append('</tr>');
		}
		$('#table').append('</tbody></table>');
	};
	//method that display the board

	this.switchColor = function(x,y) {
			var td = $('td[dataX="'+x+'"][dataY="'+y+'"]');
			if(!td.hasClass('black') && !td.hasClass('white')) {
				td.removeClass().addClass(this.currentPlayer);
				this.board[x][y] = this.currentPlayer;
				this.checkChain(x,y);
				// this.checkNeighbors(x,y);
				this.switchPlayers();
			}

	}
	//method that switch color to black or white depends on the current player

	this.checkNeighbors = function(x,y) {
		if (this.currentPlayer == 'black') {
			this.oppositePlayer = 'white';
		}
		else {
			this.oppositePlayer = 'black';
		}
		x = parseInt(x);
		y = parseInt(y);
		var opponent = false;
		console.log(x+' '+y);
		if (x-1 >= 0) {
			if (this.board[x-1][y] == this.oppositePlayer) {
				opponent = x-1+' '+y;
			}
		}
		console.log(x+1);
		console.log(this.size);
		console.log(this.oppositePlayer);
		console.log(this.board[x+1][y]);
		if (x+1 < this.size) {
			if (this.board[x+1][y] == this.oppositePlayer) {
				opponent = x+1+' '+y;
			}
		}

		if (this.board[x][y-1] == this.oppositePlayer) {
				opponent = x+' '+y-1;
		}

		if (this.board[x+1][y+1] == this.oppositePlayer) {
				opponent = x+' '+y+1;
		}

		if (opponent) {
			console.log('There is an opponent which position is'+ opponent);
		}
	}

	this.switchPlayers = function() {
		if (this.currentPlayer == 'black') {
			this.currentPlayer = 'white';
		}
		else {
			this.currentPlayer = 'black';
		}
	}

	this.checkChain = function(x,y) {

		x = parseInt(x);
		y = parseInt(y);

		var others = new Array();

		if (this.board[x-1][y] == this.currentPlayer) {
			others.push(x-1,y);
		}
		if (this.board[x+1][y] == this.currentPlayer) {
			others.push(x+1,y);
		}
		if (this.board[x][y-1] == this.currentPlayer) {
			others.push(x,y-1);
		}
		if (this.board[x][y+1] == this.currentPlayer) {
			others.push(x,y+1);
		}

		this.addChain(x,y,others);
	}

	this.addChain = function(x,y,others) {
		console.log(others);
		if (others.length < 1) {
			//We create a new object that we add to the array that countains all of our chains.
			this.chains.push({
				"color" : this.currentPlayer,
				"numberLinks": 1,
				1 : {
					"x" : x,
					"y" : y
				}
			});
		}
		else {
			for (k = 0; k < others.length/2; k++) {
				otherX = others[k*2];
				otherY = others[(k*2)+1];
				for (var i = 0; i < this.chains.length; i++) {
					for (var key in this.chains[i]) {
						if (this.chains[i].hasOwnProperty(key)) {
							// console.log(this.chains[i][key].x + ' ' + otherX);
							// console.log(this.chains[i][key].y + ' ' + otherY);
							// console.log(this.chains[i][key].numberLinks);
							if (this.chains[i][key].x == otherX && this.chains[i][key].y == otherY) {
								this.chains[i]['numberLinks']++;
								this.chains[i][this.chains[i]['numberLinks']] = {
									"x" : x,
									"y" : y
								}
								console.log("success");
							}
						}
					}
				}
			}
			this.checkDoubleChains(x,y);
		}
	}

	this.checkDoubleChains = function(x,y) {
		var instances = new Array();
		for (var i = 0; i < this.chains.length; i++) {
			for (var key in this.chains[i]) {
				if (this.chains[i].hasOwnProperty(key)) {
					if (this.chains[i][key].x == x && this.chains[i][key].y == y) {
						instances.push(i);
					}	
				}
			}
		}
		if (instances.length > 1) {
			this.mergeDoubleChains(instances);
		}
	};

	this.mergeDoubleChains = function(instances) {
		for (var i = 0; i < instances.length; i++) {
			theChain = parseInt(instances[i]);
			this.chains[theChain]
		}
	};
}

var game = new GoGame(9); //we create a new game (new instance of GoGame)

var board = game.create(); //we create the board
game.render(board); //we display the board

//on click on the td, we switch color....
$('td').on('click',function(){
	var x = $(this).attr('dataX');
	var y = $(this).attr('dataY');
	game.switchColor(x,y); // ... by calling the method of the object
	
});