function GoGame (size) {
	this.size = size;
	this.board;
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

	this.render = function(board) {
		$('#table').append('<table><tbody>');
		for (var i = 0; i < board.length; i++) {
			$('#table').append('<tr>');
			for(var j=0; j< board.length; j++) {
				$('#table').append('<td dataX="'+i+'" dataY="'+j+'">'+board[i][j]+'</td>');
			}
			$('#table').append('</tr>');
		}
		$('#table').append('</tbody></table>');
		};
		
	this.switchColor = function(color,x,y) {
		if (color == 'black') {
			$('td[dataX="'+x+'"][dataY="'+y+'"]').removeClass().addClass('black');
		}
	}
}

var game = new GoGame(4);

var board = game.create();
game.render(board);