var calculate = require('./calculate');

exports.Item = function( item_data ) {
  var public = {
    description : item_data.description,
    price : item_data.price,
    quantity : item_data.quantity
  };

  return public;
};

var Item = exports.Item;
exports.Person = function( name, room ) {
  var public = {
    room : room,
    name : name,
    items : [],
    subtotal : 0,
    hasItem : function ( description ){
      for (var i = this.items.length - 1; i >= 0; i--) {
        if (this.items[i].description == description){
          return true;
        }
      }
      return false;
    },
    addItem : function( item_data ) {
      if (!this.hasItem(item_data.description)){
        var item = new Item( item_data );
        this.items.push( item );
      }
      this.updateSubtotal();
    },
    removeItem : function( item_description ) {
      if( this.hasItem( item_description ) ) {
        var item_position;
        for (var i = this.items.length - 1; i >= 0; i--) {
          if (this.items[i].description == item_description){
            item_position = i;
          }
        }
        this.items.splice( item_position, 1 );
      }
      this.updateSubtotal();
    },
    updateSubtotal : function() {
      this.subtotal = calculate.calculateSubtotal( this.items );
      this.room.refreshGroupTotal();
    }
  };
  return public;
};

var Person = exports.Person;
exports.Room = function( name ) {
  var public = {
    name : name,
    people : [],
    group_total : 0,
    people_list : [],
    addPerson : function( name ) {
      if( !this.hasPerson( name ) ) {
        var person = new Person( name, this );
        this.people.push( person );
        //do diff
        this.refreshPeopleList();
        // this.people_list.push (person.name);
      }
    },
    hasPerson : function( name ){
      for (var i = this.people.length - 1; i >= 0; i--) {
        if (this.people[i].name == name){
          return true;
        }
      }
      return false;
    },
    getPerson : function( name ){
      for (var i = this.people.length - 1; i >= 0; i--) {
        if (this.people[i].name == name){
          return i;
        }
      }
      return false;
    },
    removePerson : function( name ){
      if( this.hasPerson( name ) ) {  
        this.people.splice( this.getPerson( name ), 1 );
        this.refreshPeopleList()
      }
     
    },
    refreshPeopleList : function(){
      this.people_list = [];
      for (var i = this.people.length - 1; i >= 0; i--) {
        this.people_list.push ( this.people[i].name );
      }
     
    },
    refreshGroupTotal : function() {
      var group_total = 0;
      for( var i = this.people.length - 1; i >= 0; i-- ) {
        group_total += this.people[i].subtotal;
      }
      this.group_total = group_total;
    },
  };
  return public;
};

var Room = exports.Room;
exports.App = function() {
  var public = {
    rooms : [],
    room_list : [],
    addRoom : function( name ){
      if( !this.hasRoom ( name )){
        var room = new Room( name );
        this.rooms.push( room ); 
        this.refreshRoomList(); 
      }
    },
    hasRoom : function ( name ){
      for (var i = this.rooms.length - 1; i >= 0; i--) {
        if (this.rooms[i].name == name){
          return true;
        }
      }
      return false;
    },
    refreshRoomList : function(){
      this.room_list = [];
      for (var i = this.rooms.length - 1; i >= 0; i--) {
        this.room_list.push ( this.rooms[i].name );
      }
    },
  };
  return public
};
