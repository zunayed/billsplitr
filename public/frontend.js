var socket = io.connect();
var username = ''

$(function() {
   $('#itemControl').hide();
   // $('#groupTotal').hide();
   $("#usernameSet").click(function() {setUsername()});
   $("#addItem").click(function() {addItem()});

});

function addItem () {
   var quantity = $('#quantity').val();
   var price = $('#price').val();
   var description = $('#description').val();
   var items = [];

   var msg =  quantity + " " + description + " each costing " + price;
   $("#itemList").append("<li class='list-group-item' data-price='" + price + "' data-quantity='" + quantity + "' data-description='" + description + "'>" + msg + "</li>");

   $("#itemList li").each(function (index, li){
      var quantity = $(li).data('quantity');
      var price = $(li).data('price');
      var description = $(li).data('description');
      items.push({
         quantity: quantity,
         price: price,
         description: description
      });
   });
   //returns user data 
   socket.emit('addItem', {name: username, items: items})
}

function setUsername() {
   username = $("#usernameInput").val()
   if (username != "")
   {
      socket.emit('addNewUser', username);
      $('#usernameInput').hide();
      $('#usernameSet').hide();
      $('#itemControl').show();
   }
}

socket.on('peopleInRoom', function(people) {
   $("#userList").html('');
   for(var i = 0; i < people.length; i++){
      var person = people[i];
      $("#userList").append("<li class='list-group-item'>" + person + " in the room</li>");
   };
})

socket.on('groupTotal', function(data) {
   $("#groupTotal").html("");
   $("#groupTotal").append("Current Group Total is $" + data);
   
})


