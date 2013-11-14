var io = require('socket.io');
var calculate = require( '../calculate' );
var models = require( '../models' );

var bs = new models.App();

exports.initialize = function (server) {
	'use strict';

	io = io.listen(server);

	io.sockets.on('connection', function ( socket ) {

		socket.on('getRoom', function (){
			socket.emit( 'getRoom', bs.room_list );
		});
		//room setup
		socket.on('joinRoom', function ( data ) {
            socket.join( data.room );
   
            bs.addRoom( data.room );
            var rm_index = bs.getRoom( data.room );

            bs.rooms[rm_index].addPerson( data.name );

            //broadcast to people in the room names of people and message

            socket.emit( 'updateChat', { message: 'You have joined '  + data.room } );
			socket.broadcast.to( bs.rooms[rm_index].name ).emit(
				'updateChat', { message: data.name + ' joined room ' + data.room });

			socket.emit( 'peopleInRoom', bs.rooms[rm_index].people_list);
			socket.broadcast.to ( bs.rooms[rm_index].name ).emit( 'peopleInRoom', bs.rooms[rm_index].people_list );

			socket.emit('groupTotal', Math.round( bs.rooms[rm_index].group_total ));

		});
		
		//item add
		socket.on('addInfo', function ( data ) {

			var rm_index = bs.getRoom( data.room );
			var person_index = bs.rooms[rm_index].getPerson( data.name );

			if ( data.items.length > 0 ){
				for (var i = data.items.length - 1; i >= 0; i--) {
					bs.rooms[rm_index].people[person_index].addItem( data.items[i] );
				}
			}

			socket.emit( 'updateItemList', {
				items: bs.rooms[rm_index].people[person_index].items,
				subTotal: Math.round( bs.rooms[rm_index].people[person_index].subtotal )
			});

			var last_item = data.items[data.items.length - 1];
			socket.emit( 'updateChat', { message: data.name +  ' had '  + 
				last_item.quantity + ' ' + last_item.description + ' each costing $' + last_item.price });


			socket.broadcast.to( bs.rooms[rm_index].name ).emit( 'updateChat', { message: 
				data.name + ' had ' + last_item.quantity + ' ' + last_item.description + ' @ $' + last_item.price });


			socket.emit('groupTotal', Math.round( bs.rooms[rm_index].group_total ));
			socket.broadcast.to ( bs.rooms[rm_index].name ).emit( 'groupTotal', Math.round( bs.rooms[rm_index].group_total ) );

		});
	});
};