var express = require("express");
var app = express();
var port = 3000;
var io = require('socket.io').listen(app.listen(port));
 
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
    res.send("It works!");
});


io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});