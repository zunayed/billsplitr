var socket = io.connect('http://localhost:3000');
var subtotal = 0;

socket.on('joined', function (people) {
$("#stream").html('');
for(var i = 0; i < people.length; i++){
  var person = people[i];
  $("#stream").append("<li class='list-group-item'>" + person + " in the room</li>");
}
});

socket.on('addTotal', function (groupTotal) {

$("#groupTotal").html('total is' + groupTotal);

});

$('#save-btn').on('click', function(){
  socket.emit('joined', collectData());
  $('#firstname').hide();
  $('#save-btn').hide();
});

$('#add-item-btn').on('click', function(){
  var qty = $('#qty').val();
  var price = $('#price').val();
  var description = $('#description').val();
  var msg =  qty + " " + description + " each costing " + price;
  $("#userItems").append("<li class='list-group-item' data-price='" + price + "' data-qty='" + qty + "' data-description='" + description + "'>" + msg + "</li>");

  socket.emit('addTotal', collectData());
});

var collectData = function(){
var firstname = $('#firstname').val();
var qty = $('#qty').val();
var price = $('#price').val();
var description = $('#description').val();
var items = [];
$("#userItems li").each(function (index, li){
  var qty = $(li).data('qty');
  var price = $(li).data('price');
  var description = $(li).data('description');
  items.push({
    qty: qty,
    price: price,
    description: description
  });
});
//returns user data 
console.log({name: firstname, items: items})
return {name: firstname, items: items};
};
