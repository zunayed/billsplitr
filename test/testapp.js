var assert = require('assert');
var calculate = require('../calculate');
var models = require('../models');

describe('Billsplitr tests', function(){
  describe('#model test()', function(){
    //intial setup
    beforeEach(function(){
      this.app = new models.App();
      this.person = new models.Person('test_person');
      this.room = new models.Room('test_room');
      this.person = new models.Person("test_person", this.room);
    });

    it('should create a new room and assign an app to it', function() {
      assert.equal(0, this.app.rooms.length);
      this.app.addRoom('test_room')
      assert.equal(1, this.app.rooms.length);
      assert.equal('test_room', this.app.rooms[0].name);
    });

    it('should check duplicate room is not added', function() {
      this.app.addRoom('test_room')
      assert.equal(1, this.app.rooms.length);
      this.app.addRoom('test_room')
      assert.equal(1, this.app.rooms.length);
    });


    it('should return an room class object, intialized data should be clean', function(){
      assert.equal(0, this.room.people.length);
      assert.equal(0, this.room.group_total);
      assert.equal('test_room', this.room.name);

    });

    it('intialized person should return person object and item data matching pass params', function(){
      var person = this.person;
      assert.equal(0, person.items);
      assert.equal(0, person.subtotal);
      assert.equal('test_person', person.name);
    });

    it( 'tests adding a person to the room', function() {
      var room = this.room;
      room.addPerson( 'test_person' );
      assert.equal( 1, room.people.length );
      assert.equal( 'test_person', room.people[0].name );
      room.addPerson( 'zunayed' );
      test_list = ['zunayed','test_person'];
      people_list = room.people_list;
      assert.deepEqual(test_list, people_list);
    });

    it( 'tests calculating the subtotal', function() {
      var items = [{'quantity':3,'price':5,'description':'beer'},{'quantity':1,'price':12,'description':'burger'}];
      var person = this.person;
      person.addItem( items[0] );
      assert.equal( 19.03125, person.subtotal );
      person.addItem( items[1] );
      assert.equal( 34.25625, person.subtotal );
    });

    it('intialized beer should retun beer object and item data matching pass params', function(){
      var person = this.person;
      var beer_data = {'quantity':3,'price':5,'description':'beer'};
      var beer = new models.Item( beer_data );
      assert.equal(3, beer.quantity);
      assert.equal(5, beer.price);
      assert.equal('beer', beer.description);
    });

    it( 'checks that a duplicate person cannot be added to an room', function() {
      var room = this.room;
      room.addPerson( 'test_person' );
      room.addPerson( 'test_person' );
      assert.equal( 1, room.people.length );
    });

    //'quantity':3,'price':5,'description':'beer'
    it('add an item to a person and see if params match', function(){
      var person = this.person;
      var beer = {'quantity':3,'price':5,'description':'beer'}
      assert.equal(0, this.person.items.length);
      person.addItem(beer)
      assert.equal(1, this.person.items.length);
      assert.equal(3, this.person.items[0].quantity);
      assert.equal(5, this.person.items[0].price);
      assert.equal('beer', this.person.items[0].description);

    });

    it('duplicate item is rejected from persons item list', function(){
      var person = this.person;
      var beer = {'quantity':3,'price':5,'description':'beer'}
      var beer2 = {'quantity':2,'price':6,'description':'beer'}

      person.addItem(beer);
      assert.equal(1, this.person.items.length);
      person.addItem(beer2);
      assert.equal(1, this.person.items.length);

      assert.equal(3, this.person.items[0].quantity);
      assert.equal(5, this.person.items[0].price);
      assert.equal('beer', this.person.items[0].description);
    });

    it( 'tests removing an item from a user', function() {
      var items = [{'quantity':3,'price':5,'description':'beer'},{'quantity':1,'price':12,'description':'burger'}];
      var person = this.person;
      person.addItem( items[0] );
      person.addItem( items[1] );
      assert.equal( 2, person.items.length );
      person.removeItem( 'beer' );
      assert.equal( 1, person.items.length );
      assert.equal( 'burger', person.items[0].description );
      assert.equal( 15.225, person.subtotal );
    } );

    it( 'tests that an room is keeping track of the group total', function() {
      var room = this.room;

      var beer   = {"quantity":3,"price":5,"description":"beer"};
      var burger = {"quantity":1,"price":12,"description":"burger"};

      room.addPerson( "shak" );
      assert.equal( 0, room.group_total );

      room.addPerson( "zunayed" );
      assert.equal( 0, room.group_total );

      var shak    = room.people[0];
      var zunayed = room.people[1];

      shak.addItem( beer );
      zunayed.addItem( burger );

      assert.equal( 34.25625, room.group_total );
      shak.addItem( burger );
      assert.equal( 15.225 + 34.25625, room.group_total );
      zunayed.removeItem( "burger" );
      assert.equal( 34.25625, room.group_total );
    } );

    it( 'should find a user', function() {
      var room = this.room;
      room.addPerson( 'shak' );
      room.addPerson( 'zunayed' );
      assert.equal( 'shak', room.people[room.getPerson('shak')].name );
      assert.equal( 'zunayed', room.people[room.getPerson('zunayed')].name );
    } );

    it( 'remove a user', function() {
      var room = this.room;
      room.addPerson( 'shak' );
      room.addPerson( 'zunayed' );
      room.removePerson( 'zunayed' );
      assert.equal( 'shak', room.people_list );
    } );
  });
});
