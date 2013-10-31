var socket = io.connect();
var username = '';
var items = [];

$(function() {
   $('#itemControl').hide();
   $("#usernameSet").click( function() { addUser() } );
   $("#addItem").click( function() { collectData() } );

});

function addUser() {
   username = $("#usernameInput").val();
   if ( username != "" ) {
      socket.emit('addInfo', { name: username, items: [] })
      $('#usernameInput').hide();
      $('#usernameSet').hide();
      $('#itemControl').show();
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
      socket.emit('addInfo', {name: username, items: items})
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
   $("#groupTotal").append("<li>Group Total $" + data + "</li>")
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

