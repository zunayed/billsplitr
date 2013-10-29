var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');

var calculate = require('./calculate');
var models = require('./models');

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

app = new models.App();

io.sockets.on('connection', function (socket) {
  socket.emit('joined', app.people_list);
  socket.broadcast.emit('addTotal', app.group_total);
  //****** add pushing of group total *********
  
  socket.on('joined', function (data) {
    app.addPerson(data.name)

    socket.emit('joined', app.people_list);
    socket.broadcast.emit('joined', app.people_list);
  });

  socket.on('addItem', function (data) {

    //****** add a new item to user *********
    






    // var items = user_data.items;
    // var calculated_values = calculate.calculateSubtotal(items);
    // var subtotal = calculated_values.subtotal;

    // group_total += subtotal
    // socket.emit('addTotal', group_total);
    // socket.broadcast.emit('addTotal', group_total);
  });
});
