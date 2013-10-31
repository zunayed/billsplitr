var express = require( 'express' ), app = express(), 
	http = require( 'http' ), 
	server = http.createServer( app ), 
	io = require( 'socket.io' ).listen( server ), 
	jade = require( 'jade' );

var calculate = require( './calculate' );
var models = require( './models' );
 
server.listen( 3000 );
 
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'jade' );
app.set( "view options", { layout: false } );
app.configure( function() {
	app.use(express.static( __dirname + '/public' ));
	app.use(express.static( __dirname + '/public/css' ));

});

app.configure('development', function(){
  app.use(express.errorHandler());
    app.locals.pretty = true;
});

app.get('/', function( req, res ){
  res.render( 'home.jade' );
});


bs = new models.App();

io.sockets.on('connection', function ( socket ) {

	function emit( channel , data )  {
		socket.emit( channel, data );
		socket.broadcast.emit( channel, data );
	}

	//broadcast all people in room
	emit( 'peopleInRoom', bs.people_list );
	//Group total
	emit( 'groupTotal', Math.round( bs.group_total ) );	

	//add a new item
	socket.on('addInfo', function ( data ) {
		bs.addPerson( data.name );
		person_index = bs.getPerson(data.name)
		if (data.items.length > 0) {
			for (var i = data.items.length - 1; i >= 0; i--) {
				bs.people[person_index].addItem( data.items[i] );
			};
		}
		emit( 'peopleInRoom', bs.people_list );
		emit( 'groupTotal', Math.round( bs.group_total ) );

	});
});