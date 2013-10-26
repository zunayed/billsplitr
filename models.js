exports.Item = function( item_data ) {
  var public = {
    description : item_data.description,
    price : item_data.price,
    quantity : item_data.quantity
  };
  return public;
};

var Item = exports.Item;
exports.Person = function( name ) {
  var public = {
    name : name,
    items : [],
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
    }
  }
  return public;
};

var Person = exports.Person;
exports.App = function() {
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
