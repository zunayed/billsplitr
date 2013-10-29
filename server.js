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
});
 
app.get('/', function( req, res ){
  res.render( 'home.jade' );
});

billsplitr = new models.App();
 
io.sockets.on('connection', function ( socket ) {

	//broadcast all people in room
	socket.emit( 'peopleInRoom', billsplitr.people_list );
	socket.broadcast.emit( 'peopleInRoom', billsplitr.people_list );
	//Group total
	socket.emit( 'groupTotal', Math.round( billsplitr.group_total ) );
	socket.broadcast.emit( 'groupTotal', Math.round( billsplitr.group_total ) );
 
	// set username
	socket.on('addNewUser', function ( name ) {
		billsplitr.addPerson( name );
		socket.emit( 'peopleInRoom', billsplitr.people_list );
		socket.broadcast.emit( 'peopleInRoom', billsplitr.people_list );
	});

	//add a new item
	socket.on('addItem', function ( data ) {
		person_index = billsplitr.getPerson(data.name)
		for (var i = data.items.length - 1; i >= 0; i--) {
				billsplitr.people[person_index].addItem( data.items[i] );
		};
		socket.emit( 'groupTotal', Math.round( billsplitr.group_total ) );
		socket.broadcast.emit( 'groupTotal', Math.round( billsplitr.group_total ) );

	});


});