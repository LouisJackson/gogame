// New class to create a Go Game
function GoGame (size) {
	this.size = size; //the size of the board
	this.board; //we create a new empty board
	this.currentPlayer = 'black';
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
				this.switchPlayers();
			}

	}
	//method that switch color to black

	this.switchPlayers = function() {
		if (this.currentPlayer == 'black') {
			this.currentPlayer = 'white';
		}
		else {
			this.currentPlayer = 'black';
		}
	}
}

var game = new GoGame(9); //we create a new game (new instance of GoGame)

var board = game.create(); //we create the board
game.render(board); //we display the board

//on click on the td, we switch color....
$('td').on('click',function(){
	var x = $(this).attr('dataX');
	var y = $(this).attr('dataY');
	console.log(x + ' ' + y);
	game.switchColor(x,y); // ... by calling the method of the object
	
});