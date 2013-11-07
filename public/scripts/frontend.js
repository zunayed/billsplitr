var socket = io.connect();
var items = [];

var urlData = function () {
   // function is anonymous, is executed immediately and returns value 
   var query_string = {};
   var query = window.location.search
   query = query.split("?");
 
   for (var i = 0; i < query.length; i++) {

      var pair = query[i].split("=");
      query_string[pair[0]] = pair[1];
       
   }  
   return query_string;
} ();

var username = urlData.name;
var room = urlData.room;

$(function() {

   addUser();
   $("#addItem").click( function() { collectData() } );

});

function addUser() {
   if ( username != "" ) {
      socket.emit('joinRoom', { name: username, room: room })
   }
}

function collectData() { 
   var quantity = $('#quantity').val();
   var price = $('#price').val();
   var description = $('#description').val();

   if (description != "") {
      var msg =  quantity + " " + description + " each costing " + price;
      $("#itemList").append("<li class='list-group-item' data-price='" + price + "' data-quantity='" + quantity + "' data-description='" + description + "'>" + msg + "</li>");

      items.push({
         quantity: quantity,
         price: price,
         description: description
      });
     
      //returns user data 
      socket.emit('addInfo', {name: username, room: room, items: items})
   }
}

socket.on('peopleInRoom', function(people) {
   $("#userList").html('');
   for(var i = 0; i < people.length; i++){
      var person = people[i];
      $("#userList").append("<li class='list-group-item'>" + person + "</li>")
   };
})

socket.on('groupTotal', function(data) {
   $("#groupTotal").html("")
   $("#groupTotal").append("<h3>Group Total $" + data + "</h3>")
})

socket.on('updateItemList', function(data) {
   $("#subTotal").html("<h3>You Owe: $ " + data.subTotal + "</h3>")
   items = data.items
   $("#itemList").html('');
   for (var i = items.length - 1; i >= 0; i--) {
      var msg =  items[i].quantity + " " + items[i].description + " each costing " + items[i].price;
      $("#itemList").append("<li class='list-group-item' data-price='" + items[i].price + "' data-quantity='" + items[i].quantity + "' data-description='" + items[i].description + "'>" + msg + "</li>");
   };
})

socket.on('updateChat', function(server_data) {

   $('#messageList').append("<li>" + server_data.message + "</li>")

})




