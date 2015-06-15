/*TO DO LIST

[] Faire en sorte d'interdire le joueur à se suicider s'il est surrounded
[] Donner la possibilité de passer son tour
[] Mettre à jour le fichier 'board' en cas de suppression
[] Gérer les captures des pierres avec les rebords
[] Gérer le jeu en réseau
[] Gérer le jeu avec une IA.
*/
// New class to create a Go Game
function GoGame (size) {


	this.size = size; //the size of the board
	this.board; //we create a new empty board
	this.chainBoard; // we create a new empty board that will contain the chains
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
    	this.chainBoard = new Array();

		for (var i = 0; i < m.length; i++)
			this.chainBoard[i] = m[i].slice();
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
				this.checkOpponents(x,y);
				this.switchPlayers();
			}

	}
	this.removeChain = function(chain) {
		var currentX, currentY;
		for (var key in this.chains[chain]) {
				if (key != 'numberLinks' && key != 'color') {
					if (this.chains[chain].hasOwnProperty(key)) {
						currentX = this.chains[chain][key].x;	
						currentY = this.chains[chain][key].y;
						console.log(currentX +' & '+ currentY);
						var td = $('td[dataX="'+currentX+'"][dataY="'+currentY+'"]');
		td.removeClass();
					}
				}
			}

	}

	this.updateChainboard = function(chain) {
		for (var i = 0; i < this.chainBoard.length; i++) {
			for (var j = 0; j < this.chainBoard[i].length; j++) {
				console.log(this.chainBoard[i][j]);
				console.log(chain);
				if (this.chainBoard[i][j] > chain) {
					this.chainBoard[i][j]--;
				}
			};
		};
	};


	//method that switch color to black or white depends on the current player

	this.checkSuscide = function(cChain) {
		var currentX, currentY, exit = 0;

		if (this.currentPlayer == 'black') {
			this.oppositePlayer = 'white';
		}
		else {
			this.oppositePlayer = 'black';
		}

		var currentChain = this.chains[cChain];

		for (var key in currentChain) {
			if (key != 'numberLinks' && key != 'color') {
				if (currentChain.hasOwnProperty(key)) {
					currentX = currentChain[key].x;
					currentY = currentChain[key].y;
					if (this.board[currentX-1] != undefined) {
						if (this.board[currentX-1][currentY] == false) {
							exit++;
						}
					}

					if (this.board[currentX+1] != undefined) {
						if (this.board[currentX+1][currentY] == false) {
							exit++;
						}
					}

					if (this.board[currentX][currentY-1] != undefined) {
						if (this.board[currentX][currentY-1] == false) {
							exit++;
						}
					}
					
					if (this.board[currentX][currentY+1] != undefined) {
						if (this.board[currentX][currentY+1] == false) {
							exit++;
						}
					}
				}
			}
		}
		return exit;
	}

	this.checkOpponents = function(x,y) {

		if (this.currentPlayer == 'black') {
			this.oppositePlayer = 'white';
		}
		else {
			this.oppositePlayer = 'black';
		}

		x = parseInt(x);
		y = parseInt(y);

		var opponents = new Array();

		if (this.board[x-1] != undefined) {
			if (this.board[x-1][y] == this.oppositePlayer) {
				opponents.push(x-1,y);
			}
		}

		if (this.board[x+1] != undefined) {
			if (this.board[x+1][y] == this.oppositePlayer) {
				opponents.push(x+1,y);
			}
		}

		if (this.board[x][y-1] != undefined) {
			if (this.board[x][y-1] == this.oppositePlayer) {
				opponents.push(x,y-1);
			}
		}
		
		if (this.board[x][y+1] != undefined) {
			if (this.board[x][y+1] == this.oppositePlayer) {
				opponents.push(x,y+1);
			}
		}

		console.log(opponents);
		for(var i=0; i<(opponents.length/2); i++)
		{
			console.log(this.chainBoard[opponents[i*2]][opponents[i*2+1]]);
			var chainNumber = this.chainBoard[opponents[i*2]][opponents[i*2+1]]; //Get the number of the chains.
			var libertyNumber = this.checkSuscide(chainNumber);
			console.log(libertyNumber);
			if(libertyNumber == 0)
			{
				this.removeChain(chainNumber);
				this.chains.splice(chainNumber, 1);
				this.updateChainboard(chainNumber);
			}
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

		if (this.board[x-1] != undefined) {
			if (this.board[x-1][y] == this.currentPlayer) {
				others.push(x-1,y);
			}
		}

		if (this.board[x+1] != undefined) {
			if (this.board[x+1][y] == this.currentPlayer) {
				others.push(x+1,y);
			}
		}

		if (this.board[x][y-1] != undefined) {
			if (this.board[x][y-1] == this.currentPlayer) {
				others.push(x,y-1);
			}
		}
		
		if (this.board[x][y+1] != undefined) {
			if (this.board[x][y+1] == this.currentPlayer) {
				others.push(x,y+1);
			}
		}

		this.addChain(x,y,others);
	}

	this.addChain = function(x,y,others) {

		var instances = new Array();

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
			instances.push(this.chains.length-1);
			this.chainBoard[x][y] = this.chains.length-1;
		}
		else {
			for (k = 0; k < others.length/2; k++) {
				otherX = others[k*2];
				otherY = others[(k*2)+1];
				for (var i = 0; i < this.chains.length; i++) {
					for (var key in this.chains[i]) {
						if (this.chains[i].hasOwnProperty(key)) {
							if (this.chains[i][key].x == otherX && this.chains[i][key].y == otherY) {
								this.chains[i]['numberLinks']++;
								this.chains[i][this.chains[i]['numberLinks']] = {
									"x" : x,
									"y" : y
								};
								instances.push(i);
							}
						}
					}
				}
			}
			this.chainBoard[x][y] = instances[0];
			this.checkDoubleChains(x,y,instances);
		}
		this.checkSuscide(instances[0]);
	}

	this.checkDoubleChains = function(x,y,instances) {

		//Check if it's the same chains 

		for (var u = 0; u < (instances.length-1); u++) {
			if (instances[u] == instances[u+1]) {
				instances.splice(u+1,1);
				var row = this.chains[instances[u]].numberLinks;
				delete this.chains[instances[u]][row];
				this.chains[instances[u]].numberLinks = row-1;
			}
		};

		if (instances.length > 1) {
			this.mergeDoubleChains(instances,x,y);
		}

	};

	this.mergeDoubleChains = function(instances,x,y) {
		var mergedChains = instances;
		var size = mergedChains.length;
		for (var i = 0; i < (size-1); i++) {
			theChain = parseInt(mergedChains[size-(i+1)]);
			thePreviousChain = parseInt(mergedChains[mergedChains.length-(i+2)]);
			currentLink = this.chains[theChain];
			previousLink = this.chains[thePreviousChain];
			for (var key in currentLink) {
				if (key != 'numberLinks' && key != 'color') {
					if (currentLink.hasOwnProperty(key)) {
						if (!(currentLink[key].x == x && currentLink[key].y == y)) {
							previousLink['numberLinks']++;
							previousLink[previousLink['numberLinks']] = {
								"x" : currentLink[key].x,
								"y" : currentLink[key].y
							};
							//update chain value in chainboard
							this.chainBoard[currentLink[key].x][currentLink[key].y] = mergedChains[0];
						}	
					}
				}
			}
			this.chains.splice(theChain,1);

			//ICI ON MET A JOUR TOUTES LES CHAINES SITUEES APRES LA CHAINE COURANTE EN ENLEVANT -1
			this.updateChainboard(theChain);
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
