var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

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

var people = [];
var total = 0

io.sockets.on('connection', function (socket) {
  socket.on('joined', function (data) {
    people.push(data);
    console.log(people);
    socket.emit('joined', people);
    socket.broadcast.emit('joined', people);
    socket.broadcast.emit('addTotal', total);
  });

  socket.on('addTotal', function (subtotal) {
    console.log('total')
    console.log(total)
    total = total + subtotal
    console.log(total)
    socket.emit('addTotal', total);
    socket.broadcast.emit('addTotal', total);
  });
});