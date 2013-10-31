var socket = io.connect();
var username = '';

$(function() {
   $('#itemControl').hide();
   $("#usernameSet").click( function() { addUser() } );
   $("#addItem").click( function() { collectData() } );

});

function addUser() {
   username = $("#usernameInput").val()
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
      console.log(items)
      socket.emit('addInfo', {name: username, items: items})
   }
}

socket.on('peopleInRoom', function(people) {
   $("#userList").html('');
   for(var i = 0; i < people.length; i++){
      var person = people[i];
      $("#userList").append("<li class='list-group-item'>" + person + " in the room</li>")
   };
})

socket.on('groupTotal', function(data) {
   $("#groupTotal").html("")
   $("#groupTotal").append("<li>Group Total $" + data + "</li>")
})

