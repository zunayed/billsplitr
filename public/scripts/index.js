var socket = io.connect();
var username = '';
var room = '';

socket.emit('getRoom');

socket.on('getRoom', function(rooms) {

	for (var i = rooms.length - 1; i >= 0; i--) {
		$('#roomList').append('<option value="' + rooms[i] + '">' + rooms[i] + '</option>');
	}
});


$(function() {
	$('#joinRoom').click(function () { 

		username = $('#userName').val()
		room = $('#roomName').val()
		console.log(username)
		console.log(room)
		if ( $('#roomList').val() == 'ClickityClack' & username !== ''){ 
			addUser(username, room); 
		}
		else if ( $('#roomList').val() !== 'ClickityClack' ){
			addUser( username, $('#roomList').val() );
		}
	});
}); 


function addUser(username, room){ 

	window.location.replace(window.location.search + 'app?room=' + room + '?name=' + username)
	
};

