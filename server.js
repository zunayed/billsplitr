//Module dependencies.

var express = require('express');
var http = require('http'); 
var jade = require('jade');
var path = require('path');

var routes = require('./routes');
var app = express();

// all environments

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// routes

app.get('/', routes.index);
app.get('/:roomId', routes.room);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//throws server to socket io
require('./routes/sockets.js').initialize(server);

