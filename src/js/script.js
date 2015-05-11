function GoGame (size) {
	this.size = size;
	this.create = function() {
		var m = new Array();
		for (var i = 0; i < this.size; i++) {
        	m[i] = new Array();
        	for (var j = 0; j < this.size; j++)
            	m[i][j] = 'black';
    	}
    	return m;
	};
	this.render = function(board) {
		$('#table').append('<table><tbody>');
		for (var i = 0; i < board.length; i++) {
			$('#table').append('<tr>');
			for(var j=0; j< board.length; j++) {
				if (board[i][j] == 'black') {
					$('#table').append('<td class="black">'+board[i][j]+'</td>');	
				}
				else {
					$('#table').append('<td>'+board[i][j]+'</td>');
				}
			}
			$('#table').append('</tr>');
		};
		$('#table').append('</tbody></table>');
	}
}

var game = new GoGame(4);

var board = game.create();
game.render(board);


console.log(board);