var username = '';
var room = '';

$(function() {

   $('#joinRoom').click(function () {addUser()}); 

});

function addUser() {

   username = $('#userName').val()
   room = $('#roomName').val()
  
   if ( username != "" ){
      // socket.emit('joinRoom', { name: username, room: room })
      window.location.replace("http://localhost:3000/app?room=" + room + '?name=' + username);
   }
}

// socket.on('updateChat', function(server_data) {

//    $('#messageList').append('<br></br>' + server_data.message)

// })