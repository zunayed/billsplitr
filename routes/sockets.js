var io = require('socket.io');
var calculate = require( '../calculate' );
var models = require( '../models' );

bs = new models.App();

rooms = []

exports.initialize = function (server) {
	io = io.listen(server);

	io.sockets.on('connection', function ( socket ) {

		function emit( channel , data )  {
			socket.emit( channel, data );
			socket.broadcast.emit( channel, data );
		}


		//add a new item & person
		// socket.on('addInfo', function ( data ) {

		// 	bs.addPerson( data.name );
		// 	person_index = bs.getPerson( data.name )
		// 	if ( data.items.length > 0 ) {
		// 		for ( var i = data.items.length - 1; i >= 0; i-- ) {
		// 			bs.people[ person_index ].addItem( data.items[i] );
		// 		};
		// 	}

		// 	socket.emit( 'updateItemList', {
		// 		name: bs.people[person_index].name,
		// 		items: bs.people[person_index].items, 
		// 		subTotal: Math.round( bs.people[person_index].subtotal )
		// 	});
		// 	emit( 'peopleInRoom', bs.people_list );
		// 	emit( 'groupTotal', Math.round( bs.group_total ) );

		// }); 

		//room setup
		socket.on('joinRoom', function ( data ) {

			room_list = Object.keys(io.sockets.manager.rooms))

			socket.username = data.name
            socket.join( data.room );
   
            socket.emit( 'updateChat', { message: "You have joined " + data.room } );
            socket.broadcast.to( data.room ).emit('updateChat', 
            	{ message: data.name + " joined room " + data.room });

            bs.addPerson( data.name );

            //broadcast all people in room
			socket.emit( 'peopleInRoom', bs.people_list);
			socket.broadcast.to ( data.room ).emit( 'peopleInRoom', bs.people_list );

		});
	});
}