$(function() {
    
    $('#header-icon').click(function(e) {
    	e.preventDefault();
    	$('body').toggleClass('with-sidebar');
    })

});