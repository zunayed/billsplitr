var socket = io.connect();
var items = [];
var groupTotal = 0;
var subTotal = 0;
var personTotal =0;

socket.on('peopleInRoom', function(people) {
   $("#userList").html('');
   for(var i = 0; i < people.length; i++){
      var person = people[i];
      $("#userList").append('<li class="list-group-item">' + person + '</li>');
   }
});

socket.on('groupTotal', function(data) {
   $("#groupTotal").html("");
   $("#groupTotal").append("<h3>Group Total $" + data + "</h3>");
   groupTotal = data;

   updateGlobalChart();
});

socket.on('updateItemList', function(data) {
   $("#subTotal").html("<h3>You Owe: $ " + data.subTotal + "</h3>");
   subTotal = data.subTotal;
   items = data.items;

   $("#itemList").html('');
   for (var i = items.length - 1; i >= 0; i--) {
      var msg =  items[i].quantity + " " + items[i].description + " each costing " + items[i].price;
      $("#itemList").append("<li class='list-group-item' data-price='" + items[i].price + "' data-quantity='" + items[i].quantity + "' data-description='" + items[i].description + "'>" + msg + "</li>");
   }

   updateGlobalChart();
});

socket.on('updateChat', function(server_data) {

   $('#messageList').append("<li>" + server_data.message + "</li>");

});

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
   $("#placeholder2").hide();

});

function addUser() {
   if ( username !== "" ) {
      socket.emit('joinRoom', { name: username, room: room })
   }
}

function collectData() { 
   var quantity = $('#quantity').val();
   var price = $('#price').val();
   var description = $('#description').val();

   if (description != "") {
      var msg =  quantity + " " + description + " each costing " + price;
      // $("#itemList").append("<li class='list-group-item' data-price='" + price + "' data-quantity='" + quantity + "' data-description='" + description + "'>" + msg + remove + "</li>");

      items.push({
         quantity: quantity,
         price: price,
         description: description
      });
     
      //returns user data 
      socket.emit('addInfo', {name: username, room: room, items: items})
      $("#placeholder2").show();
      updateChart(items);

   }
}

function updateChart(items) {

   var chart_array = [];

   // Add an item

   var items_cost = 0;
   for (var i = 0; i < items.length; i++) {
     items_cost += items[i].quantity * items[i].price;
   }

   var tax = items_cost * 0.08875;
   var tip = items_cost * 0.18;
   var label = "Item Cost $" + Math.round( items_cost );
   var value = items_cost;
   var data1 = {
     label: label,
     data: value,
     color: '#33CCCC'
   };

   label = "tax $" + Math.round( tax );
   value = tax;
   var data2 = {
     label: label,
     data: value,
     color: "#FF5050"
   };

   label = "tip $" + Math.round( tip );
   value = tip;
   var data3 = {
     label: label,
     data: value
   };

   chart_array.push(data1, data2, data3); 
   $.plot('#placeholder', chart_array, {
     series: {
         pie: {
             innerRadius: 0.5,
             show: true
         }
     }
   });
}

function updateGlobalChart() {

    if (subTotal != groupTotal){

        var chart_array = [];

        var label = "Group $" + groupTotal;
        var value = groupTotal;
        var data1 = {
            label: label,
            data: value,
            color: "#545454"
        };

        var label = "Individual $" + subTotal ;
        var value = subTotal;
        var data2 = {
            label: label,
            data: value
        };

        chart_array.push(data1, data2); 

        $.plot('#placeholder2', chart_array, {
            series: {
                pie: {
                    innerRadius: 0.5,
                    show: true
                }
            }
        });
    }
}



