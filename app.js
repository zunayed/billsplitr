var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');

var calculate = require('./calculate');

app.listen(3000);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}
var Item = function( item_data ) {
  var public = {
    name : item_data.name,
    price : item_data.price,
    quantity : item_data.quantity
  };
  return public;
};
var Person = function( name ) {
  var public = {
    name : name,
    items : [],
    addItems : function( item_data ) {
      var item = new Item( item_data );
      this.items.push( item );
    }
  }
  return public;
};

var App = function() {
  var public = {
    people : [],
    group_total : 0,
    addPerson : function( name ) {
      var person = new Person( name );
      this.people.push( person );
    }
  }
  return public;
};

app = new App();

io.sockets.on('connection', function (socket) {
  socket.emit('joined', app.people );
  socket.broadcast.emit('addTotal', group_total);
  
  socket.on('joined', function (data) {
    people.push(data);
    socket.emit('joined', app.people );
    socket.broadcast.emit('joined', app.people);
    
  });

  socket.on('addTotal', function (user_data) {
    var items = user_data.items;
    var calculated_values = calculate.calculateSubtotal(items);
    var subtotal = calculated_values.subtotal;

    group_total += subtotal
    socket.emit('addTotal', group_total);
    socket.broadcast.emit('addTotal', group_total);
  });
});
